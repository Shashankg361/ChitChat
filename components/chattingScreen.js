import { pool } from "@/pages/_app";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function ChattingScreen(){
    const {chatToUser,user} = useContext(pool);
    const [chats,setChats] = useState([]);
    const {register, formState:{errors},handleSubmit} = useForm();

    async function getChat(){
        const response =await axios.post('api/getChat',{collectionName:`${chatToUser?.collection}`});
        const data = response.data;
        setChats(data.data);
    }
    chats && console.log("chats",chats);

    useEffect(()=>{
        chatToUser && getChat();
    },[chatToUser]);

    const socket = async (chatToUser)=>{
        console.log("websocket",chatToUser),
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
            console.log("websocket message",message);
            setChats([...chats,JSON.parse(message)]);
        })
    }

    useEffect(()=>{
        chatToUser && socket(chatToUser);
    },[chatToUser])

    const submit = async(formData)=>{
        const storeMessage = {
            To: chatToUser?.name,
            message:formData.Message,
            from:user?.name,
        }
        console.log("sending message",storeMessage);
        console.log("ChatoUser",chatToUser);

        try{
            const response = await axios.post('api/sendMessage',{storeMessage,collectionName:chatToUser?.collection});
            toast.success(response.Message);
        }catch(error){
            toast.error(`Error occured ${error}`);
        }
        
    };
    
    return(<>
        <div className="flex flex-col justify-between w-full m-2">
            <div>
                { chats.length > 0 && chats?.map((element)=>{
                    if(element.from === user.name){
                        return<>
                            <h1 className="bg-green-700 text-black">{element.message}</h1>
                        </>
                    }else{
                        return<>
                            <h1 className="bg-amber-300 text-black">{element.message}</h1>
                        </>
                    }
                })}
            </div>
            <div className="w-full">
                <form className="flex" onSubmit={handleSubmit(submit)}>
                    <input type="text" className="border-2 border-black w-full p-2 rounded-lg" placeholder="Message..." {...register("Message")}></input>
                    <button type="submit" className="font-semibold text-lg"><FontAwesomeIcon icon={faPaperPlane}  className=""/>send</button>
                </form>
            </div>
        </div>
    </>)
}