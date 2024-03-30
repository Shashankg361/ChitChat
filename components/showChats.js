import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function ShowChats(){
    const {chatToUser,user,chats} = useContext(pool);
    const [messages,setMessages] = useState(chats);
    var socket = undefined;

    useEffect(()=>{
        setMessages(chats);
    },[chats])

    const socketfunc = async ()=>{
        console.log("websocket",chatToUser);
        // console.log("looking for chat",chat);
        //await axios();
        socket = io('http://localhost:8080',{
            query:{
                name: `${chatToUser.collection}`,
            }
        });

        socket.on('connect',()=>{
            toast.success('Connected');
        })

        socket.on(`${chatToUser?.collection}`,(message)=>{
            console.log("running at show chat",chatToUser?.collection);
            const newMeassage = JSON.parse(message);
            console.log("websocket message",newMeassage);
            console.log("added to",messages);
            setMessages([...messages,newMeassage]);
        })
    }

    useEffect(()=>{
       (chatToUser != undefined) && socketfunc();
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