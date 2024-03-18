import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
export const pool = createContext();
export default function App({ Component, pageProps }) {
  const [userdata,setUserData] = useState({});
  return (
    <SessionProvider session={pageProps.session}>
      <pool.Provider value={{userdata,setUserData}}>
        <Component {...pageProps} />
      </pool.Provider>
    </SessionProvider>
  )
  
}
