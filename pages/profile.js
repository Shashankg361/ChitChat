//import { client, connectDb } from '@/Database/handleDatabase';
import { client, connectDb } from '@/Database/handleDatabase';
import Chat from '@/components/chat';
import {useUser} from '@auth0/nextjs-auth0/client'
import axios from 'axios';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState , useEffect} from 'react';

export default function Profile(){
    const router = useRouter();
    const [user,setUser] = useState(false);
    const {data,status} = useSession();
    console.log("userDetails",data);

    if(status == 'loading') return <div>{"...Loading"}</div>

        if(status == 'authenticated') {
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

    
    return(
        <div></div>
    )

}

async function AddNewUser(data){
    const response = await axios.post('/api/addNewUser',{data})
}

async function getData(){
    try{
        await connectDb();
        const db = client.db('User');
        const collection = db.collection('me');
        await collection.insertOne({name:'bsudhbfj'});
    }catch(error){
        console.log("error",error);
    }
}

export async function getServerSideProps(){
    await getData();
    const data = 'hii';
    return{
        props:{data}
    }
}