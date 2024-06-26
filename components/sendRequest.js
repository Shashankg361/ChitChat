import { pool } from "@/pages/_app"
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SendRequest(){

    const {userdata,user} = useContext(pool);
    const [users,setUsers] = useState([]);
    let persent = null;
    const [valid,setValid] = useState(true);
    const {register , formState:{errors} , handleSubmit,setValue} = useForm();
    useEffect(()=>{
        if(!userdata){
            setUsers(userdata);
        }else{
            const data = localStorage.getItem("Users");
            setUsers(JSON.parse(data));
        }
    },[])
    
    //console.log("at sendRequest",userdata,users);    
    //console.log("USERS",users);
    const submit = async (details)=>{
        //console.log(details);

        if(users)
        {persent = users?.filter((element)=>{
            //console.log("in filter",element.email);
            return(element.email == details.Request)});}
        //console.log("length",persent);
        if(persent?.length>0){
            try{
                const response = await axios.post("/api/sendRequest",{Request:details.Request,user});
                const data = await response.data;
                if(data.success === 'Yes'){
                    toast.success(`${data.Message}`);
                }else{
                    toast.error(`${data.Message}`);
                }
                
            }catch(error){
                toast.error("Internal error");
            }
            setValue('Request','');
            setValid(true);
            persent=null;
        }else{
            setValid(false);
        }
    }

    async function sendReequestfunc(requestTo){
        try{
            const response = await axios.post('/api/sendRequest',{Request:requestTo,user});
            const data = await response.data;
            if(data.success === 'Yes'){
                toast.success(`${data.Message}`);
            }else{
                toast.error(`${data.Message}`);
            }
        }catch(error){
            toast.error("Internal error");
        }
    }

    return(
        <div className="w-full flex flex-col items-center justify-center">
            
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" className="p-2 m-2 border-2 rounded-xl" placeholder="Enter mail_id" {...register("Request" , {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })} ></input>
                <input type="submit" value={"Send"} className="cursor-pointer hover:opacity-70 rounded-lg bg-gray-400 p-2 font-semibold"></input>
                {errors.Request &&  <h1 className="text-red-500 text-center">{errors.Request.message}</h1>}
                {valid ?"": <h1 className="text-red-500 text-center">{"Email is not register on ChitChat"}</h1>}

            </form>

            {
                users?.map((element,index)=>{
                    return<div key={index} className="w-auto border-2 p-2 rounded-lg shadow-sm flex items-center h-16 m-1">
                    <img src={element.image} className="rounded-full w-12 mr-5 h-12 border-2"></img>
                    <h1>{element.email}</h1>
                    <button onClick={()=>sendReequestfunc(element.email)} className="cursor-pointer rounded-lg bg-red-400 hover:bg-green-300 ml-1 p-1 font-normal">Add friend</button>
                </div>
                })
            }
            
        </div>
    )
}