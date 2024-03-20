import { pool } from "@/pages/_app"
import axios from "axios";
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";

export default function SendRequest(){

    const {userdata,user} = useContext(pool);
    var persent;
    const [valid,setValid] = useState(true);
    const {register , formState:{errors} , handleSubmit} = useForm();
    console.log("at sendRequest",userdata);    
    const submit = async (details)=>{
        //console.log(details);

        if(userdata)
        {persent = userdata.map((element)=>{
            console.log("in filter",element.email);
            return(element.email == details.Request)});}
        console.log("length",persent);
        if(persent?.length>0){
            const response = await axios.post("/api/sendRequest",{Request:details.Request,user});
            const data = await response.data;
            alert(data.Message);
            setValid(true);
        }else{
            setValid(false);
        }
    }

    return(
        <div className="w-full flex items-center justify-center">
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" className="p-2 m-2" placeholder="Enter mail_id" {...register("Request" , {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })} ></input>
                {errors.Request &&  <h1 className="text-red-500">{errors.Request.message}</h1>}
                {valid ?"": <h1 className="text-red-500">{"Not a valid user please enter correct mail_id"}</h1>}
                <input type="submit" className="cursor-pointer"></input>
            </form>
            
        </div>
    )
}