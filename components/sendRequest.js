import { pool } from "@/pages/_app"
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function SendRequest(){

    const {userdata,user} = useContext(pool);
    const [users,setUsers] = useState([]);
    let persent = null;
    const [valid,setValid] = useState(true);
    const {register , formState:{errors} , handleSubmit} = useForm();
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
            setValid(true);
            persent=null;
        }else{
            setValid(false);
        }
    }

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <ToastContainer className={"absolute top-10 left-1/2"}/>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" className="p-2 m-2" placeholder="Enter mail_id" {...register("Request" , {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })} ></input>
                {errors.Request &&  <h1 className="text-red-500">{errors.Request.message}</h1>}
                {valid ?"": <h1 className="text-red-500">{"Email is not register on ChitChat"}</h1>}
                <input type="submit" className="cursor-pointer"></input>
            </form>

            {
                users?.map((element,index)=>{
                    return<div key={index} className="w-auto border-2 p-2 rounded-lg shadow-sm flex items-center h-16 cursor-pointer m-1">
                    <img src={element.image} className="rounded-full w-12 mr-5 h-12 border-2"></img>
                    <h1>{element.email}</h1>
                </div>
                })
            }
            
        </div>
    )
}