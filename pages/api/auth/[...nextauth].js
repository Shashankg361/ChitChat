import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers:[
        GoogleProvider(
            {
                clientId:process.env.GOOGLE_ID,
                clientSecret:process.env.GOOGLE_SECRET
            }
        )
    ],
    session:{
        strategy:'jwt',
        jwt:{
            secret:process.env.NEXT_AUTH_SECRET,
        }
    },
}
export default NextAuth(authOptions);