//import { MongoClient } from "mongodb";
const {MongoClient} = require('mongodb');
require('dotenv').config({path:'./env.local'});

const uri = "mongodb+srv://shashankg361:shashankChitChat@chat.ugrfa3e.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async()=>{
    try{
        await client.connect();
        console.log('connected');
    }catch(error){
        console.log('Error occured while connecting to database',error);
    }
}

module.exports={
    connectDb,
    client,
}