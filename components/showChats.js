import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function ShowChats(){
    const {chatToUser,user,chats} = useContext(pool);
    const [messages,setMessages] = useState(chats);

    useEffect(()=>{
        setMessages(chats);
    },[chats])

    const socket = async ()=>{
        console.log("websocket",chatToUser);
        // console.log("looking for chat",chat);
        await axios('api/chatingSocket',{
            params:{
                collectionName:chatToUser?.collection,
            }
        });
        const socket = io();

        socket.on('connect',()=>{
            toast.success('Connected');
        })

        socket.on(`${chatToUser?.collection}`,(message)=>{
            //console.log("running",count++);
            const newMeassage = JSON.parse(message);
            console.log("websocket message",newMeassage);
            if(newMeassage.operationType === "insert"){
            setMessages([...messages,newMeassage.fullDocument]);
            }
        })
    }

    useEffect(()=>{
       chatToUser && socket();
    },[chatToUser])

    return(
        <div className="mb-2 overflow-y-scroll">
            <ul>
                {messages?.map((element,index)=>{
                    if(element.from === user.name){
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