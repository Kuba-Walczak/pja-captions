import React,{ useEffect, useState } from 'react';

let selectedInputDevice: MediaDeviceInfo | undefined;

export function getSelectedInputDevice() {
    return selectedInputDevice;
}

export default function AudioDevice() {

    const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        getInputDevices();
        navigator.mediaDevices.addEventListener('devicechange', getInputDevices);
    }, []);

    function getInputDevices() {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            setInputDevices(devices.filter(device => device.kind === 'audioinput'));
        });
    }

    return (
        <select onChange={(e) => {
            selectedInputDevice = inputDevices.find(device => device.deviceId === e.currentTarget.value)
        }}>
            <option>Select an input device</option>
            {inputDevices.map((device) => <option value={device.deviceId}>{device.label}</option>)}
        </select>
    )
}