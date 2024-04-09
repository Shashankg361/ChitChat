import Chat from '@/components/chat';
import { useState , useEffect, useContext} from 'react';
import { pool } from './_app';
import FriendsList from '@/components/friendsList';
import SendRequest from '@/components/sendRequest';
import GetRequest from '@/components/requests';
import ChattingScreen from '@/components/chattingScreen';

export default function Profile(){
    const {userdata,showComponent,setShowComponent,toggle,setToggle} = useContext(pool);
    //console.log("at profile",userdata);

    const show = (showComponent)=>{
        switch(showComponent){
            case 'request':
                return <GetRequest />
                break;
            case 'sendRequest':
                return <SendRequest />
                break;
            case 'chattingScreen':
                return <ChattingScreen />
                break;
            default :
                return <h1>showChat</h1>
                break;
        }
    }
    
    return(
        <div className='bg-white flex flex-col p-1 overflow-scroll text-black h-dvh w-auto'>
            <Chat />
            <div className="flex">
                <div className={`md:border-r-2 ${toggle?"block":"hidden"} md:block p-5 pr-0 flex flex-col`}>
                    <div className='h-72 overflow-y-scroll pr-2 border-b-2'>
                        <FriendsList />
                    </div>
                    <div onClick={()=>setToggle(!toggle)} className='flex flex-col p-5 items-center'>
                        <h1 className='font-semibold text-lg cursor-pointer' onClick={()=>{setShowComponent('sendRequest')}}>Send Request</h1>
                        <h1 className='font-semibold text-lg cursor-pointer' onClick={()=>{setShowComponent('request')}}>Request</h1>
                    </div>
                </div>
                <div className={`w-[68rem] h-auto md:block ${toggle?"hidden":"block"}`}>
                    {show(showComponent)}
                </div>
            </div>
        </div>
    )
}