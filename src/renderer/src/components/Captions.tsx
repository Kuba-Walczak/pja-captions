import { useState, useEffect } from 'react'
import React from 'react'
import { WebSocketClient } from '../webSocketClient'

let captionArray: string[]

let webSocketClient : WebSocketClient | null

export function initiateConnection() {
    console.log('initiateConnection')
    if (webSocketClient) return
        webSocketClient = new WebSocketClient()
        webSocketClient.connect()
}
  
 export function terminateConnection() {
    if (!webSocketClient) return
    console.log('terminateConnection')
    webSocketClient.close()
    webSocketClient = null
 }

export default function Captions() {

    const [captions, setCaptions] = useState('')

    useEffect(() => {
        window.api.transcriptToFrontEnd((text : string) => {
            setCaptions(text);
        });
    }, [])
    //temp implementation
    // const newArray = [...captionArray, transcript]
    // console.log(newArray)
    // if (newArray.length > 5)
    //     newArray.length = 0;
    // captionArray = newArray
// }
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
            <h1 className="text-6xl font-bold text-white" style={{ color: 'white', fontSize: '5rem' }}>dasads{captions}</h1>
        </div>
    )
}