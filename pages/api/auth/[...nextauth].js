import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers:[
        GoogleProvider(
            {
                clientId:process.env.NEXTAUTH_GOOGLE_ID,
                clientSecret:process.env.NEXTAUTH_GOOGLE_SECRET
            }
        )
    ],
    session:{
        strategy:'jwt',
        jwt:{
            secret:process.env.NEXTAUTH_SECRET,
        }
    },
    callbacks: {
        signIn: 'https://chitchat-rcqe.onrender.com/api/auth/callback/google',
    },

}
export default NextAuth(authOptions);
