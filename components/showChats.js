import { pool } from "@/pages/_app";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
//import { io } from "socket.io-client";
import { socket, socketfunc } from "./callSocket";

export default function ShowChats(){
    const {chatToUser,user,chats,setChats} = useContext(pool);
    const MessageContainer = useRef(null)
    
    useEffect(()=>{
        socketfunc(chatToUser,setChats);
    },[chatToUser])

    useEffect(()=>{
        MessageContainer.current.scrollTop = MessageContainer.current.scrollHeight;
    },[chats])

    useEffect(()=>{
        if (chatToUser && socket) {
            console.log("at UseEffect with socketFUNC", chatToUser);
            socket.emit('user-changed', JSON.stringify(chatToUser.collection));
        }
    },[chatToUser,socket]);
    
    return(
        
        <div ref={MessageContainer} className="mb-2 h-full overflow-y-scroll">
            {!chats && <h1 className="font-bold text-lg text-black">Loading...</h1>}
            <ul>
                {chats?.map((element,index)=>{
                    const date = new Date(element.Time);
                    
                    const hours = date.getHours();
                    const minutes = date.getMinutes();

                    const formattedHours = hours < 10 ? '0' + hours : hours;
                    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

                    const timeString = `${formattedHours}:${formattedMinutes}`;

                    if(element.from === user.email){
                        return<>
                            <li key={index} className="bg-green-300 p-2 w-fit m-2 border-2 border-black relative rounded-l-lg rounded-tr-lg text-black">
                                <div className=" grid ">
                                    <h1>{element.message}</h1>
                                    <h1 className="text-xs justify-self-end">{timeString && timeString}</h1>
                                </div>
                            </li>
                        </>
                    }else{
                        return<>
                            <li key={index} className="bg-amber-200 p-2 w-fit m-2 border-2 border-black rounded-r-lg rounded-bl-lg text-black">
                                <div className=" grid ">
                                    <h1>{element.message}</h1>
                                    <h1 className="text-xs justify-self-end">{timeString && timeString}</h1>
                                </div>
                            </li>
                        </>
                    }
                })}
            </ul>
                
        </div>
    )
}