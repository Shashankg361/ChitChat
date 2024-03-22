import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const pool = createContext();
export default function App({ Component, pageProps }) {
  const [userdata,setUserData] = useState();
  const [user,setUser] =useState();
  const [isClient,setIsClient] = useState(false);
  useEffect(()=>{
    setIsClient(true);
  },[]);
  return (
    <SessionProvider session={pageProps.session}>
      <pool.Provider value={{userdata,setUserData,user,setUser}}>
        {isClient && <ToastContainer />}
        <Component {...pageProps} />
      </pool.Provider> 
    </SessionProvider>
  )
  
}
