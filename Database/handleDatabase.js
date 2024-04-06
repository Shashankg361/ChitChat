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

client.on('close',()=>{
    console.log("client Disconnected");
})

module.exports={
    connectDb,
    client,
}