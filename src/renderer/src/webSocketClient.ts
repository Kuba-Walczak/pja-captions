import { getSelectedInputDeviceId } from './components/audioDevice';
import { ipcMain, BrowserWindow } from 'electron'

export class WebSocketClient {

    socket: WebSocket | null = null
    
    async connect() {

        const selectedInputDeviceId = getSelectedInputDeviceId();
        let selectedInputDeviceStream: MediaStream | null = null;

        fetch('https://mp.speechmatics.com/v1/api_keys?type=rt',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.env.API_KEY
                },
                body: JSON.stringify({ttl: 60})
            })
            .then(response => response.json())
            .then(key => {
                this.socket = new WebSocket('wss://neu.rt.speechmatics.com/v2?jwt=' + key.key_value)
                this.socket.onopen = () => {
                    this.socket!.send(JSON.stringify({
                        message: "StartRecognition",
                        audio_format: {
                            type: "raw",
                            encoding: "pcm_s16le",
                            sample_rate: 16000
                        },
                        transcription_config: {
                            operating_point: 'enhanced',
                            language: "pl",
                            max_delay: 0.7,
                            max_delay_mode: 'flexible'
                        },
                        translation_config: {
                            enable_partials: true,
                            target_languages: ["en"]
                        }
                        
                    }))
                    navigator.mediaDevices.getUserMedia({audio: {deviceId: selectedInputDeviceId}}).then(async stream => {
            selectedInputDeviceStream = new MediaStream([stream.getAudioTracks()[0]]);
            const audioContext = new AudioContext({sampleRate: 16000});
            const source = audioContext.createMediaStreamSource(selectedInputDeviceStream!);
            audioContext.audioWorklet.addModule(new URL('./processor.js', import.meta.url)).then(
                () => {
                    const processor = new AudioWorkletNode(audioContext, "processor");
                    processor.port.onmessage = (event) => {
                    const float32Data = event.data.audioData
                    // Convert Float32Array to Int16 PCM (Speechmatics format)
                    const int16Data = new Int16Array(float32Data.length);
                    for (let i = 0; i < float32Data.length; ++i) {
                        int16Data[i] = Math.max(-32768, Math.min(32767, float32Data[i] * 32768));
                    }
                    //console.log('Speechmatics PCM format:', int16Data.buffer);
                    this.socket!.send(int16Data.buffer);
                    };
                    source.connect(processor).connect(audioContext.destination);
                });
                })};
                this.socket.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    switch (data.message) {
                        case 'AddTranslation':
                            //window.api.transcriptToBackend("Translation: " + data.results[0].content)
                            break;
                        case 'AddPartialTranslation':
                            window.api.transcriptToBackend("Partial Translation: " + data.results[0].content)
                            break;
                    }
                };
                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error)
                };
                
                this.socket.onclose = (event) => {
                    console.log('WebSocket closed:', {
                        code: event.code,
                        reason: event.reason,
                        wasClean: event.wasClean
                    });
                };
        }).catch(error => {
            console.error('Error getting input device from device id:', selectedInputDeviceId, error);
        });
    }

    close() {
        this.socket!.close();
        this.socket = null;
    }

}