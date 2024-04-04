import { pool } from "@/pages/_app";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
const uri = process.env.NEXT_PUBLIC_PORT ? `https://chit-chat-shashank.vercel.app:${process.env.NEXT_PUBLIC_PORT}` : 'https://chit-chat-shashank.vercel.app:8080' ;
export const socket = io(uri);

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
