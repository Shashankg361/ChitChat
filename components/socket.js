import { pool } from "@/pages/_app";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
export const socket = io('http://localhost:8080');

socket.on('connect',()=>{
    console.log("Connected");
})

export async function socketfunc(chatToUser,chats,setChats){
    
    socket.off(`${chatToUser?.collection}`);
    socket.on(`${chatToUser?.collection}`,(message)=>{
        const newMessage = JSON.parse(message);
        console.log("newM",newMessage);
        setChats(prevMessages => [...prevMessages, newMessage]);
    })
}

// export default function Socket(){

//     const {chatToUser,setChats} = useContext(pool);

    
// }