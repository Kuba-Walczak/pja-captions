import React,{ useEffect, useState } from 'react';

let selectedInputDeviceId: string | undefined;

export function getSelectedInputDeviceId() {
    return selectedInputDeviceId;
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
            selectedInputDeviceId = e.currentTarget.value;
        }}>
            <option>Select an input device</option>
            {inputDevices.map((device) => <option value={device.deviceId}>{device.label}</option>)}
        </select>
    )
}