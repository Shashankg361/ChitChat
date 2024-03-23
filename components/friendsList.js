import { pool } from "@/pages/_app"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react"
import useSWR from "swr";

export default function FriendsList(){
    const {updateFriendsList,setShowComponent,setChatToUser} = useContext(pool);
    const {data} = useSession();
    const [dataList , setdataList] = useState();
    const {FriendData,error} = useSWR('Friends',);
    //console.log("UsersDatatat",data);
    const email = data?.user?.email;
    async function friendsList(){
        const response = await axios.post("/api/getFriendsList",{email});
        //alert(response.data.Message);
        const List = response.data;
        //console.log("response",List.data);
        setdataList(List.data);
        // datalist = List.data;
        // datalist && console.log("Listed",datalist);
    }
    useEffect(()=>{
        data && friendsList();
    },[data,updateFriendsList])

    function setStatesFunc(element){
        setShowComponent("chattingScreen");
        setChatToUser(element);
    }

    return(
        <>
            {dataList?.map((element)=>{
                return<div onClick={()=>setStatesFunc(element)} className="w-full border-2 p-2 rounded-lg shadow-sm flex items-center h-16 ">
                    <img src={element.image} className="rounded-full w-12 mr-5 h-12 border-2"></img>
                    <h1>{element.name}</h1>
                </div>
            })}
        </>
    )
}