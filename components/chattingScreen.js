import { pool } from "@/pages/_app";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function ChattingScreen(){
    const {chatToUser} = useContext(pool);
    const {register, formState:{errors},handleSubmit} = useForm();
    
    return(<>
        <div className="flex flex-col justify-between w-full">
            <div>
                <h1 className="w-full">Message area</h1>
            </div>
            <div className="w-full">
                <form className="flex" onSubmit={handleSubmit(submit)}>
                    <input type="text" className="border-2 border-black w-full" {...register("Message",{required:""})}></input>
                    <input type="submit" className=""><FontAwesomeIcon icon={faPaperPlane} /></input>
                </form>
            </div>
        </div>
    </>)
}