import { pool } from "@/pages/_app";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr"
import { socket } from "./callSocket";

async function fetcher([_,user]){
    try{
        const response = await axios.post("/api/getRequest",{email:user.email});
        const data = response.data;
        return data.data;
    }catch(error){
        return error;
    }
} 

export default function GetRequest(){
    const {user,updateFriendsList,setUpdateFriendsList} = useContext(pool);
    const {data,error} = useSWR((['request',user]),fetcher);
    const [requestList,setRequestList] = useState();

    useEffect(()=>{
        socket.on('Request',(request)=>{
            const changeInRequest = JSON.parse(request);
            if(changeInRequest.change.operationType == 'delete'){
                setRequestList(changeInRequest.data);
            }else if(changeInRequest.change.operationType == 'insert'){
                setRequestList(prevData=>[...prevData,changeInRequest.change.fullDocument]);
            }
        })
    },[])

    useEffect(()=>{
        setRequestList(data);
    },[data]);

    async function acceptor(addFriend){
        try{const response = await axios.post("api/addfriend",{user,addFriend});
            const data = response.data;
            toast.success(`${data.Message}`);
        }catch(error){
            toast.error('Error while fetching data')
        }
    }

    const reject = async ()=>{
        try{
            const response = await axios.post('/api/Rejcted',{user,addFriend});
            toast('Rejected');
        }catch(error){
            toast.error('Error occured');
        }
    }

    if(requestList?.length <= 0){
        return(
            <div className="flex w-full items-center justify-center">
                <div className="font-semibold text-xl">No Requests</div>
            </div>
        )
    }

    return(<>
            {!requestList && <div className="flex items-center"><h1 className="font-bold text-lg">Loading...</h1></div> }
            <div className="flex w-full items-center justify-center">
                <ToastContainer className={"absolute top-10 left-1/2"}/>
                <div className="border-2 rounded-lg shadow-2xl shadow-black p-4">
                    {requestList?.length>0 && data.map((element,index)=>{
                        return(
                            <div key={index} className="w-full border-2 p-2 rounded-lg shadow-sm flex justify-between items-center h-16 ">
                            <img src={element.image} className="rounded-full w-12 h-12 border-2 m-1"></img>
                            <h1 className="ml-2">{element.name}</h1>
                            <div className="flex ml-2">
                                <button className="border-2 bg-green-600 rounded-full p-2 mr-2" onClick={()=>{acceptor(element);setUpdateFriendsList(!updateFriendsList);}}><FontAwesomeIcon icon={faCheck}/></button>
                                <button className="border-2 bg-red-600 rounded-full p-2 " onClick={reject}><FontAwesomeIcon icon={faX}/></button>
                            </div>
                            </div>)
                    })}
                </div>
            </div>
            </>
    )
}