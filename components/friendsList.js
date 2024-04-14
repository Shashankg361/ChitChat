import { pool } from "@/pages/_app"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react"
import useSWR from 'swr';

async function fetcher([_,email]){
    try{
        const response = await axios.post("/api/getFriendsList",{email});
        const List = response.data;
        return List.data
    }catch(error){
        return error;
    }
}

export default function FriendsList(){
    const {setShowComponent,setChatToUser,toggle,setToggle} = useContext(pool);
    const {data} = useSession();
    const [dataList , setdataList] = useState();
    const email = data?.user?.email;
    const {data:friendList , error} = useSWR(['friends',email],fetcher,{ refreshInterval: 5000 })

    useEffect(()=>{
        console.log("at friends seetting somti8hingoi",friendList);
        setdataList(friendList);
    },[friendList]);

    function setStatesFunc(element){
        setShowComponent("chattingScreen");
        setChatToUser(element);
        setToggle(!toggle);
    }

    return(
        <>
            {!dataList && <div className="flex items-center"><h1 className="font-bold text-lg">Loading...</h1></div>}
            {dataList?.length <= 0 && <h1 className="font-semibold text-lg text-center">Go to Send Request or Request to make friends</h1>}
            {dataList?.map((element,index)=>{
                return<div key={index} onClick={()=>setStatesFunc(element)} className="w-full border-2 p-2 rounded-lg shadow-sm flex items-center h-16 cursor-pointer m-1">
                    <img src={element.image} className="rounded-full w-12 mr-5 h-12 border-2"></img>
                    <h1>{element.name}</h1>
                </div>
            })}
        </>
    )
}