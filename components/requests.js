import { pool } from "@/pages/_app";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import useSWR from "swr"

async function fetcher([_,user]){
    try{
        console.log("at request",user);
        const response = await axios.post("/api/getRequest",{email:user.email});
        const data = response.data;
        console.log("API response",data.data);
        return data.data;
    }catch(error){
        return error;
    }
} 

export default function GetRequest(){
    const {user} = useContext(pool);
    const {data,error} = useSWR((['request',user]),fetcher);
    console.log("gandu",data)
    return(
        <div className="flex w-full items-center justify-center">
            <div className="border-2 rounded-lg shadow-2xl shadow-black p-4">
                {data && data.map((element)=>{
                    return(
                        <div className="w-full border-2 p-2 rounded-lg shadow-sm flex justify-between items-center h-16 ">
                        <img src={element.image} className="rounded-full w-12 h-12 border-2"></img>
                        <h1>{element.name}</h1>
                        <div className="flex">
                            <button className="border-2 bg-green-600 rounded-full p-2 mr-2"><FontAwesomeIcon icon={faCheck}/></button>
                            <button className="border-2 bg-red-600 rounded-full p-2 "><FontAwesomeIcon icon={faX}/></button>
                        </div>
                        </div>)
                })}
            </div>
        </div>
        
    )
}