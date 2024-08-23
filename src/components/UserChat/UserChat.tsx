import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const UserChat: React.FC = () => {
    const socket = io("http://localhost:3000")

    useEffect(() => {
        console.log(" i am useEffect");

        socket.on("connect", () => {
            console.log("connected", socket.id);
        })
        socket.on("welcome", (s) => {
            console.log(s);
        })
    }, [])
    return (
        <div>UserChat</div>
    )
}

export default UserChat