import { getSelectedInputDeviceId } from '../components/audioDevice';
import { addCaption } from '../components/Captions';

export class WebSocketClient {

    private socket: WebSocket;

    constructor() {

        fetch('https://mp.speechmatics.com/v1/api_keys?type=rt',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.env.API_KEY
                },
                body: JSON.stringify({ ttl: 60 })
            })
            .then(response => response.json())
            .then(key => {
                this.socket = new WebSocket('wss://neu.rt.speechmatics.com/v2?jwt=' + key.key_value)
                this.socket.onopen = () => {
                    console.log('WebSocket opened, readyState:', this.socket.readyState);
                };
                this.socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    switch (data.message) {
                        case 'AddTranslation':
                            addCaption(data.results[0].content);
                            break;
                        case 'AudioAdded':
                            break;
                        default:
                            console.log(data);
                    }
                };
                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                
                this.socket.onclose = (event) => {
                    console.log('WebSocket closed:', {
                        code: event.code,
                        reason: event.reason,
                        wasClean: event.wasClean
                    });
                };
            })

    }
    
    async test() {
        const selectedInputDeviceId = getSelectedInputDeviceId();
        let selectedInputDeviceStream: MediaStream | null = null;
        navigator.mediaDevices.getUserMedia({audio: {deviceId: selectedInputDeviceId}}).then(async stream => {
            selectedInputDeviceStream = new MediaStream([stream.getAudioTracks()[0]]);
            const audioContext = new AudioContext({sampleRate: 16000});
            const source = audioContext.createMediaStreamSource(selectedInputDeviceStream!);
            await audioContext.audioWorklet.addModule(new URL('./processor.js', import.meta.url));
            const processor = new AudioWorkletNode(audioContext, "processor");
            this.socket.send(JSON.stringify({
                message: "StartRecognition",
                audio_format: {
                    type: "raw",
                    encoding: "pcm_s16le",
                    sample_rate: 16000
                },
                transcription_config: {
                    language: "pl",
                    max_delay: 0.7,
                    max_delay_mode: 'flexible'
                },
                translation_config: {
                    target_languages: ["en"]
                }
            }));
            processor.port.onmessage = (event) => {
                const float32Data = event.data.audioData;
                // Convert Float32Array to Int16 PCM (Speechmatics format)
                const int16Data = new Int16Array(float32Data.length);
                for (let i = 0; i < float32Data.length; i++) {
                    int16Data[i] = Math.max(-32768, Math.min(32767, float32Data[i] * 32768));
                }
                //console.log('Speechmatics PCM format:', int16Data.buffer);
                this.socket.send(int16Data.buffer);
            };
            source.connect(processor).connect(audioContext.destination);
        }).catch(error => {
            console.error('Error getting input device from device id:', selectedInputDeviceId, error);
        });
    }

    close() {
        this.socket.close();
    }

}