import { pool } from "@/pages/_app";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
export const socket = io('http://localhost:8080');

export async function socketfunc(chatToUser,chats,setChats){
        
    socket.on('connect',()=>{
        toast.success('Connected');
    })

    socket.on(`${chatToUser?.collection}`,(message)=>{
        const newMessage = JSON.parse(message);
        console.log("newM",newMessage);
        if((chats?.filter(element=>element._id==newMessage._id)).length<=0){
            setChats(prevMessages => [...prevMessages, newMessage]);
        }
    })
}

// export default function Socket(){

//     const {chatToUser,setChats} = useContext(pool);

    
// }