import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const UserChat: React.FC = () => {
    const socket = useMemo(() => io("http://localhost:3000"), [])

    const [message, setMessage] = useState<string>('')
    const [room, setRoom] = useState<string>('')
    const [roomName, setRoomName] = useState<string>('')
    const [socketId, setSocketId] = useState<string>('')
    const [allMessage, setAllMessage] = useState<string[]>([])

    useEffect(() => {
        socket.on("connect", () => {
            if (typeof socket.id === 'string') {
                setSocketId(socket.id)
            }
        })
        socket.on("message", (data) => {
            console.log("Send mesage", data)
        })
        socket.on("receive-message", (data) => {
            console.log("receive-message", data);
            setAllMessage((allMessage) => [...allMessage, data])

        })
        socket.on("welcome", (s) => {
        })
        return () => {
            socket.disconnect()
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('message', { message, room })
        setMessage('')
    }
    const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("join-room", roomName)
        setRoomName('')
    }
    console.log(allMessage.length);

    return (
        <Container maxWidth='sm'>
            <Typography variant='h6' component='div' gutterBottom>
                {socketId}
            </Typography>
            <form onSubmit={joinRoomHandler}>
                <h5>join room</h5>
                <TextField id="filled-basic"
                    label="RoomName"
                    variant="filled"
                    value={roomName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                />
                <Button variant="outlined" type='submit'>join</Button>
            </form>

            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField id="filled-basic"
                    label="Message"
                    variant="filled"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                />
                <TextField id="filled-basic"
                    label="Room"
                    variant="filled"
                    value={room}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
                />

                <Button variant="outlined" type='submit'>Send</Button>
                <Stack>
                    {allMessage.map((item, index) =>
                        <Typography key={index} variant='h6' component='div' gutterBottom >
                            {item}
                        </Typography>
                    )}

                </Stack>
            </form>
        </Container>
    )
}

export default UserChat