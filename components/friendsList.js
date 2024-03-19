import { pool } from "@/pages/_app"
import axios from "axios";
import { useContext, useState } from "react"

export default function FriendsList({data}){
    const {userdata} = useContext(pool);
    const [dataList , setdataList] = useState();
    console.log("UsersDatatat",data);
    const email = data?.user.email;
    async function friendsList(){
        const response = await axios.post("/api/getFriendsList",{email});
        //alert(response.data.Message);
        const List = response.data;
        console.log("response",List.data);
        setdataList(List.data)
        // datalist = List.data;
        // datalist && console.log("Listed",datalist);
    }
    friendsList();

    return(
        <>
            <h1>Hello</h1>
            {dataList?.map((element)=>{
                return<div className="w-full border-2 shadow-sm flex items-center justify-between h-16 ">
                    <img src={element.image} className="rounded-full w-12 h-12 border-2"></img>
                    <h1>{element.name}</h1>
                </div>
            })}
        </>
    )
}