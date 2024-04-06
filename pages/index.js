import { Inter } from "next/font/google";
import {useSession,signIn,signOut} from 'next-auth/react';
import { useRouter } from "next/router";
import { client, connectDb } from "@/Database/handleDatabase";
import { useContext, useEffect, useMemo } from "react";
import { pool } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home({data}) {

  const {status} = useSession();
  const {setUserData,userdata} = useContext(pool);
  const router = useRouter();
  
  useEffect(()=>{
    setUserData(data);
    localStorage.setItem("Users",JSON.stringify(data));
    console.log("at index",data);
  },[data]);
  //userdata && console.log("index",userdata);
  const use = useMemo(()=>{
      if(status == 'authenticated'){
        router.push('/profile');
      }
  },[status]);

  if(status == 'Loading') {return <h1>...Loading</h1>}

  return (
    <main
      className={`flex min-h-screen flex-col bg-white text-black items-center justify-center p-24 ${inter.className}`}
    >
      <div className='flex items-center m-5'>
        <h1 className='font-semibold text-2xl'>{"Let's ChitChat"}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 p-2" viewBox="0 0 576 512">
          <path d="M284 224.8a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 284 224.8zm-110.5 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 173.6 224.8zm220.9 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 394.5 224.8zm153.8-55.3c-15.5-24.2-37.3-45.6-64.7-63.6-52.9-34.8-122.4-54-195.7-54a406 406 0 0 0 -72 6.4 238.5 238.5 0 0 0 -49.5-36.6C99.7-11.7 40.9 .7 11.1 11.4A14.3 14.3 0 0 0 5.6 34.8C26.5 56.5 61.2 99.3 52.7 138.3c-33.1 33.9-51.1 74.8-51.1 117.3 0 43.4 18 84.2 51.1 118.1 8.5 39-26.2 81.8-47.1 103.5a14.3 14.3 0 0 0 5.6 23.3c29.7 10.7 88.5 23.1 155.3-10.2a238.7 238.7 0 0 0 49.5-36.6A406 406 0 0 0 288 460.1c73.3 0 142.8-19.2 195.7-54 27.4-18 49.1-39.4 64.7-63.6 17.3-26.9 26.1-55.9 26.1-86.1C574.4 225.4 565.6 196.4 548.3 169.5zM285 409.9a345.7 345.7 0 0 1 -89.4-11.5l-20.1 19.4a184.4 184.4 0 0 1 -37.1 27.6 145.8 145.8 0 0 1 -52.5 14.9c1-1.8 1.9-3.6 2.8-5.4q30.3-55.7 16.3-100.1c-33-26-52.8-59.2-52.8-95.4 0-83.1 104.3-150.5 232.8-150.5s232.9 67.4 232.9 150.5C517.9 342.5 413.6 409.9 285 409.9z"/>
        </svg>
      </div>
      <div>
        <button onClick={() => signIn('google')} className="p-2 font-semibold text-xl border-xl rounded-xl bg-stone-200  hover:opacity-80">
          <div className="flex items-center">
            <h1>Login with google</h1> 
            <img src="/google.png" className="w-12 h-12 p-2"></img>
          </div>
        </button>
      </div>
    </main>
  )
}

export async function getServerSideProps(){
  await connectDb();
  try{
    const db = client.db("User");
    const collection = db.collection("UserDets");
    const data = await collection.find().toArray();
    //console.log("at props",data);
    return{
      props:{data : JSON.parse(JSON.stringify(data))}
    }
  }catch(error){
    console.error("Error while retrieving data",error);
    return{
      props:{data:[]}
    }
  }
} 