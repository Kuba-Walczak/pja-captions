import { useState, useEffect } from 'react'
import { WebSocketClient } from '../assets/webSocketClient'
import React from 'react'

let webSocketClient : WebSocketClient | null

let captionArray: string[]

export function initiateConnection() {
    if (webSocketClient) return
    webSocketClient = new WebSocketClient()
    setTimeout(() => {webSocketClient!.connect()}, 500)
}

export function terminateConnection() {
    if (!webSocketClient) return
    webSocketClient!.close()
    webSocketClient = null
}

export default function Captions() {

    const [captions, setCaptions] = useState('')

    const addTranscript = (transcript : string) => {
    //temp implementation
    setCaptions(transcript)
    // const newArray = [...captionArray, transcript]
    // console.log(newArray)
    // if (newArray.length > 5)
    //     newArray.length = 0;
    // captionArray = newArray
}
setTimeout(() => {
    console.log(webSocketClient)
    webSocketClient!.onTranscript = addTranscript}, 1000)
    // useEffect(() => {
    // //temp implementation
    // let combinedString: string = ''
    // captionArray.forEach((item) => {
    //     combinedString += item;
    // })
    // console.log('setting captions to ', combinedString)
    // setCaptions(combinedString);
    // }, [captionArray])

    return (
        <div>
            <h1 className="text-6xl font-bold text-white" style={{ color: 'black', fontSize: '5rem' }}>{captions}</h1>
        </div>
    )
}