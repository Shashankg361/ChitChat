import { faArrowRightFromBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import FriendsList from "./friendsList";
import { pool } from "@/pages/_app";
import axios from "axios";

export default function Chat(){
    const [toggle,setToggle] = useState(false);

    const {data,status} = useSession();
    const {userdata,setUserData} = useContext(pool);
    useEffect(()=>{
        data && AddNewUser(data);
    })
    
    if(status == 'loading') return <div>{"...Loading"}</div>

    if(status == 'authenticated') {
        console.log("running");
        return(
            <div className="flex justify-between items-center border-b-2 shadow-sm w-full h-16 p-5">
                <h1> Hi {data.user.name}</h1>
                <h1>ChitChat</h1>
                <div className="items-center ">
                    <img src={data.user.image} onClick={()=>setToggle(!toggle)} className="rounded-full border-2 w-12 h-12 cursor-pointer " alt={data.user.name + ' photo'} />
                    {toggle && <button className="border-2z-10 absolute top-16 right-5 rounded-xl p-3 m-2 mr-0 bg-red-600 hover:bg-red-400" onClick={()=>signOut({callbackUrl:'http://localhost:3000/'})}>{"LogOut"}<FontAwesomeIcon className="ml-2" icon={faArrowRightFromBracket} /></button>}
                </div>
            </div> 
        )
    }else if(status == 'unauthenticated'){
        return(
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>{"unauthenticated"}</h1>
            </div>
        )
    }
    
    return(
        <div>Something we wrong!</div>
    )
}

async function AddNewUser(data){
    const response = await axios.post('/api/addNewUser',{data});
}