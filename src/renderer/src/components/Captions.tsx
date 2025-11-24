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
        window.api.transcriptToFrontEnd((text : string) => {setCaptions(text)})}, [])
            
    return (
        <div className="fixed flex bottom-0 left-0 right-0 items-end px-24 py-52 overflow-hidden">
            <h1 className="text-7xl text-white bg-black px-6 py-4 rounded-xl max-w-[90%] break-words whitespace-normal">
                assdasd{captions}
            </h1>
        </div>
    )
}