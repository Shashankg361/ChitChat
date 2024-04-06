import { pool } from "@/pages/_app";
import {  } from "axios";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";

const callSocket = ()=>{
    fetch('/api/socket');
};

callSocket();

export const socket = io();

socket.on('connect',()=>{
    console.log("Connected");
})

export async function socketfunc(chatToUser,setChats){
    
    socket.off(`${chatToUser?.collection}`);
    socket.on(`${chatToUser?.collection}`,(message)=>{
        const newMessage = JSON.parse(message);
        console.log("newM",newMessage);
        setChats(prevMessages => [...prevMessages, newMessage]);
    })
}