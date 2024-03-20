import Chat from '@/components/chat';
import {useUser} from '@auth0/nextjs-auth0/client'
import axios from 'axios';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState , useEffect, useContext} from 'react';
import { pool } from './_app';
import FriendsList from '@/components/friendsList';

export default function Profile(){
    const {userdata} = useContext(pool);
    //userdata && console.log("UserDatata",userdata);
    
    return(
        <div className='bg-white flex flex-col p-1 text-black h-dvh'>
            <Chat />
            <div className="w-full h-full flex ">
                <div className="border-r-2 p-5 pr-0 flex flex-col w-80">
                    <div className='h-72 overflow-y-scroll pr-2 border-b-2'>
                        <FriendsList />
                    </div>
                    <div className='flex flex-col p-5 items-center'>
                        <h1 className='font-semibold text-lg cursor-pointer'>Send Request</h1>
                        <h1 className='font-semibold text-lg cursor-pointer'>Request</h1>
                    </div>
                </div>
                <h1>okay</h1>
            </div>
        </div>
    )
}