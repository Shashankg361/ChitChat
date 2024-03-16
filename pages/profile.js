import { client, connectDb } from '@/Database/handleDatabaseConnection';
import Chat from '@/components/chat';
import {useUser} from '@auth0/nextjs-auth0/client'
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Profile(){
    const router = useRouter();
    const [user,setUser] = useState(false);
    const {data,status} = useSession();
    console.log("userDetails",data);

    if(status == 'loading') return <div>{"...Loading"}</div>
    if(status == 'authenticated') {

        return (
            <Chat data={data} />
          );
    }else if(status == 'unauthenticated'){
        return(
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>{"unauthenticated"}</h1>
            </div>
        )
    }

}

// async function getData(){
//     try{
//         await connectDb();
//         const db = client.db('Users');
//         const collection = db.collection('UserDets');
//         const response = collection.insertOne({name:'shiksbjdfjk'});
//         return response;
//     }catch(error){
//         console.log("error",error);
//     }
    
// }

// export async function getSeverSideProps(){
//     try{
//         const data = await getData();
//     }catch(err){
//         console.log('err',err);
//     }
    
//     return{
//         props:{data}
//     }
// }