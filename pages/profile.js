import Chat from '@/components/chat';
import { useState , useEffect, useContext} from 'react';
import { pool } from './_app';
import FriendsList from '@/components/friendsList';
import SendRequest from '@/components/sendRequest';
import GetRequest from '@/components/requests';

export default function Profile(){
    const {userdata} = useContext(pool);
    const [showComponent,setShowComponent] = useState();
    console.log("at profile",userdata);

    const show = (showComponent)=>{
        switch(showComponent){
            case 'request':
                return <GetRequest />
                break;
            case 'sendRequest':
                return <SendRequest />
                break;
            default :
                return <h1>showChat</h1>
                break;
        }
    }
    
    return(
        <div className='bg-white flex flex-col p-1 text-black h-dvh'>
            <Chat />
            <div className="w-full h-full flex ">
                <div className="border-r-2 p-5 pr-0 flex flex-col w-80">
                    <div className='h-72 overflow-y-scroll pr-2 border-b-2'>
                        <FriendsList />
                    </div>
                    <div className='flex flex-col p-5 items-center'>
                        <h1 className='font-semibold text-lg cursor-pointer' onClick={()=>{setShowComponent('sendRequest')}}>Send Request</h1>
                        <h1 className='font-semibold text-lg cursor-pointer' onClick={()=>{setShowComponent('request')}}>Request</h1>
                    </div>
                </div>
                {show(showComponent)}
            </div>
        </div>
    )
}
//<SendRequest />

