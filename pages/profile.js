import Chat from '@/components/chat';
import {useUser} from '@auth0/nextjs-auth0/client'
import axios from 'axios';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState , useEffect, useContext} from 'react';
import { pool } from './_app';

export default function Profile(){
    const {data,status} = useSession();
    const {userdata,setUserData} = useContext(pool);
    if(status == 'loading') return <div>{"...Loading"}</div>

    if(status == 'authenticated') {
        console.log("running");
        AddNewUser(data);
        return (
            <Chat data={data} />
        )
    }else if(status == 'unauthenticated'){
        return(
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>{"unauthenticated"}</h1>
            </div>
        )
    }

    useEffect(()=>{
        console.log("API Calliing");
        setUserData(data);
        data && AddNewUser(data);
    },[data]);
    
    return(
        <div></div>
    )
}

async function AddNewUser(data){
    const response = await axios.post('/api/addNewUser',{data});
}