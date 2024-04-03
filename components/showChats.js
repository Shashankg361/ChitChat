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
        <div className="mb-2 h-full overflow-y-scroll">
            <ul>
                {chats?.map((element,index)=>{
                    if(element.from === user.email){
                        return<>
                            <li key={index} className="bg-green-300 p-2 w-fit m-2 border-2 border-black relative left-full rounded-l-lg rounded-tr-lg text-black">{element.message}</li>
                        </>
                    }else{
                        return<>
                            <li key={index} className="bg-amber-200 p-2 w-fit m-2 border-2 border-black rounded-r-lg rounded-bl-lg text-black">{element.message}</li>
                        </>
                    }
                })}
            </ul>
                
        </div>
    )
}