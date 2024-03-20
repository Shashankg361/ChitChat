import { pool } from "@/pages/_app"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";

export default async function sendRequest(){

    const {userdata} = useContext(pool);
    const [valid,setValid] = useState(true);
    const {register , formState:{errors} ,setValue, handleSubmit} = useForm();

    const submit = async (details)=>{
        if(userdata.filter((element)=>element.email == details.Request)){
            
        }else{
            setValid(false);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder="send Request" {...register(Request , {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })} ></input>
                {errors.Request &&  <h1 className="text-red-500">{errors.Request.message}</h1>}
                {valid && <h1 className="text-red-500">{"Not a valid user please enter correct mail_id"}</h1>}
                <input type="submit"></input>
            </form>
            
        </div>
    )
}