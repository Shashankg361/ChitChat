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
                return <h1 className='font-semibold text-lg text-center'>Chosse friend to talk from friend List</h1>
                break;
        }
    }
    
    return(
        <div className='bg-white flex flex-col p-1 overflow-scroll text-black h-dvh w-auto'>
            <Chat />
            <div className="flex justify-center">
                <div className={`md:border-r-2 ${toggle?"block":"hidden"} md:block p-5 pr-0 flex flex-col`}>
                    <div className='h-72 overflow-y-scroll pr-2 border-b-2'>
                        <FriendsList />
                    </div>
                    <div onClick={()=>setToggle(!toggle)} classNarme='flex flex-col p-5 items-center '>
                        <h1 className='font-semibold text-lg cursor-pointer rounded-lg text-center p-1 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%' onClick={()=>{setShowComponent('sendRequest')}}>Send Request</h1>
                        <h1 className='font-semibold text-lg cursor-pointer text-center' onClick={()=>{setShowComponent('request')}}>Request</h1>
                    </div>
                </div>
                <div className={`w-[68rem] h-auto md:block ${toggle?"hidden":"block"}`}>
                    {show(showComponent)}
                </div>
            </div>
        </div>
    )
}