import { faArrowRightFromBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Chat({data}){
    const [toggle,setToggle] = useState(false);
    return(
        <div className="bg-white flex flex-col p-1 text-black h-dvh ">
            <div className="flex justify-between items-center w-full h-16 p-5">
                <h1> Hi {data.user.name}</h1>
                <hi>ChitChat</hi>
                <div className="items-center ">
                    <img src={data.user.image} onClick={()=>setToggle(!toggle)} className="rounded-full border-2 w-12 h-12 cursor-pointer " alt={data.user.name + ' photo'} />
                    {toggle && <button className="border-2z-10 absolute top-16 right-5 rounded-xl p-3 m-2 mr-0 bg-red-600 hover:bg-red-400" onClick={()=>signOut({callbackUrl:'http://localhost:3000/'})}>{"LogOut"}<FontAwesomeIcon className="ml-2" icon={faArrowRightFromBracket} /></button>}
                </div>
            </div>
            <div className="w-full mt-2 p-2 flex justify-between">
                <h1>Chat</h1>
                <h1>okay</h1>
            </div>
              
        </div>
    )
}