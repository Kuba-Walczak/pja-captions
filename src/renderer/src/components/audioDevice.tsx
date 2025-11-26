import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
        <Select onValueChange={(e) => {
            selectedInputDeviceId = e;
        }}>
            <SelectTrigger className="w-[150px] h-[80px]">
                <SelectValue placeholder="Select Audio Device" />
            </SelectTrigger>
            <SelectContent>
                {inputDevices.map((device) => <SelectItem value={device.deviceId}>{device.label}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}