import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const pool = createContext();
export default function App({ Component, pageProps }) {
  const [userdata,setUserData] = useState([]);
  const [user,setUser] =useState();
  const [isClient,setIsClient] = useState(false);
  const [updateFriendsList,setUpdateFriendsList] = useState(false);
  const [showComponent,setShowComponent] = useState();
  const [chatToUser,setChatToUser] = useState(undefined);
  const [chats,setChats]=useState([]);
  const [toggle,setToggle] = useState(true);
  useEffect(()=>{
    setIsClient(true);
  },[]);
  return (
    <SessionProvider session={pageProps.session}>
      <pool.Provider value={{userdata,setUserData,user,setUser,updateFriendsList,setUpdateFriendsList,showComponent,setShowComponent
        ,chatToUser,setChatToUser,chats,setChats,toggle,setToggle,
      }}>
        {isClient && <ToastContainer className={"absolute top-10 left-1/2"} />}
        <Component {...pageProps} />
      </pool.Provider> 
    </SessionProvider>
  )
  
}
