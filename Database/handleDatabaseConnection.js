import { MongoClient } from "mongodb";
//require('dotenv').config({path:'./env.local'});

const uri = process.env.DATABASE_URI;
export const client = new MongoClient(uri);

export const connectDb = async()=>{
    try{
        await client.connect();
        console.log('connected');
    }catch(error){
        console.log('Error occured while connecting to database',error);
    }
}
