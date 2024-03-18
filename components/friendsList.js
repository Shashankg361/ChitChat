import { pool } from "@/pages/_app"
import axios from "axios";
import { useContext } from "react"

export default function FriendsList({data}){
    const {userdata} = useContext(pool);
    var datalist;
    console.log("UsersDatatat",data);
    const email = data?.user.email;
    async function friendsList(){
        const response = await axios.post("/api/getFriendsList",{email});
        alert(response.data.Message);
        const List = response.data.data;
        datalist = List;
    }
    friendsList();
    console.log("Listed",datalist);
    return(
        <>
            {datalist && datalist?.map((element)=>{
                return<div className="w-full border-2 shadow-sm flex h-12 ">
                    <img src={element.image} className="rounded-full w-12 h-12 border-2"></img>
                    <h1>{element.name}</h1>
                </div>
            })}
        </>
    )
}