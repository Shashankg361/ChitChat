import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function ShowChats(){
    const {chatToUser,user,chats} = useContext(pool);
    const [Messages,setMessages] = useState([]);
    //var y="";
    var socket = undefined;

    useEffect(()=>{
        setMessages([]);
    },[chatToUser])

    // useEffect(()=>{
    //     setMessages(chats);
    //     console.log("chats Chnaged",chats,"See Messages to",messages);
    // },[chats])

    const socketfunc = async ()=>{
        console.log("websocket",chatToUser);
        //console.log("looking for chat",chat);
        //await axios();
        socket = io('http://localhost:8080',{
            query:{
                name: `${chatToUser.collection}`,
            }
        });

        socket.on('connect',()=>{
            console.log("At connection time",Messages);
            toast.success('Connected');
        })

        socket.on(`${chatToUser?.collection}`,(message)=>{
            const newMessage = JSON.parse(message);
            console.log("newM",newMessage);
            if((Messages?.filter(element=>element._id==newMessage._id)).length<=0){
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        })
    }

    useEffect(()=>{
        (chatToUser != undefined) && console.log("at UseEffect with sokcetFUNC",chatToUser);
       (chatToUser != undefined) && socketfunc();
    },[chatToUser]);

    useEffect(()=>{
        console.log("Message change",Messages);
    },[Messages]);

    return(
        <div className="mb-2 overflow-y-scroll">
            <ul>
                {Messages?.map((element,index)=>{
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