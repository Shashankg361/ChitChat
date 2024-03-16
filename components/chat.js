import { signOut } from "next-auth/react";

export default function Chat({data}){
    return(
        <div className="bg-white flex text-black items-center min-h-screen justify-center">
              <h1> hi {data.user.name}</h1>
              <img src={data.user.image} className="rounded-full border-2 w-12 h-12" alt={data.user.name + ' photo'} />
              <button onClick={()=>signOut({callbackUrl:'/'})}>sign out</button>
        </div>
    )
}