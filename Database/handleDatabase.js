//import { MongoClient } from "mongodb";
const {MongoClient} = require('mongodb');
require('dotenv').config({path:'./env.local'});

const uri = process.env.NEXT_PUBLIC_DATABASE_URI;
const client = new MongoClient(uri);

const connectDb = async()=>{
    try{
        await client.connect();
        console.log('connected');
    }catch(error){
        console.log('Error occured while connecting to database',error);
    }
}

const disconnectDb = async()=>{
    try{
        console.log('working');
        await client.close()
        console.log('disconnected');
    }catch(error){
        console.log('Error occured while disconnecting to database',error);
    }
}

module.exports={
    connectDb,
    client,
    disconnectDb,
}