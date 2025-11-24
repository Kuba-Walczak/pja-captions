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
        <div>
            <h1 className="text-6x1 font-bold text-white align-right">dasdasddddddddddddddddddddddds{captions}</h1>
        </div>
    )
}