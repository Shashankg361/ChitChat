import { pool } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
//import { io } from "socket.io-client";
import { socket, socketfunc } from "./socket";

export default function ShowChats(){
    const {chatToUser,user,chats,setChats} = useContext(pool);

    useEffect(()=>{
        socketfunc(chatToUser,chats,setChats);
    },[chatToUser])

    useEffect(()=>{
        if (chatToUser && socket) {
            console.log("at UseEffect with socketFUNC", chatToUser);
            socket.emit('user-changed', JSON.stringify(chatToUser.collection));
        }
    },[chatToUser,socket]);
    
    return(
        <div className="mb-2 overflow-y-scroll">
            <ul>
                {chats?.map((element,index)=>{
                    if(element.from === user.email){
                        return<>
                            <li key={index} className="bg-green-700 text-black">{element.message}</li>
                        </>
                    }else{
                        return<>
                            <li key={index} className="bg-amber-300 text-black">{element.message}</li>
                        </>
                    }
                })}
            </ul>
                
        </div>
    )
}