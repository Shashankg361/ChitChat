import { pool } from "@/pages/_app";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import ShowChats from "./showChats";

export default function ChattingScreen(){
    const {chatToUser,user,chats,setChats} = useContext(pool);
    const {register,handleSubmit,setValue} = useForm();

    async function getChat(){
        const response =await axios.post('api/getChat',{collectionName:`${chatToUser?.collection}`});
        const data = response.data;
        setChats(data.data);
    }

    useEffect(()=>{
        getChat();
    },[chatToUser]);

    const submit = async(formData)=>{
        const storeMessage = {
            To: chatToUser?.email,
            message:formData.Message,
            from:user?.email,
        }
        setValue('Message','');
        // console.log("sending message",storeMessage);
        // console.log("ChatoUser",chatToUser);

        try{
            const response = await axios.post('api/sendMessage',{storeMessage,collectionName:chatToUser?.collection});
            console.log("At Message response",response.data.Message);
            toast.success(response.data.Message);
        }catch(error){
            toast.error(`Error occured ${error}`);
        }
        
    };
    
    return(<>
        <div className="flex flex-col justify-between w-full m-2">
            <div className="flex items-center bg-gray-200 p-2 rounded-lg"><img className="rounded-full w-12 mr-3 h-12 border-2" src={chatToUser.image}></img><h1>{chatToUser.name}</h1></div>
            <div className="h-[26rem] bg-gray-200">
                <ShowChats />
            </div>

            <div className="w-full p-2">
                <form className="flex" onSubmit={handleSubmit(submit)}>
                    <input type="text" className="border-2 border-black w-full p-2 rounded-lg" placeholder="Message..." {...register("Message")}></input>
                    <button type="submit" className="font-semibold text-lg"><FontAwesomeIcon icon={faPaperPlane}  className=""/>send</button>
                </form>
            </div>
        </div>
    </>)
}