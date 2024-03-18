const { client } = require("@/Database/handleDatabase");

export default async function getUsers(req,res){
    try{
        const db = client.db('User');
        const collection = db.collection('UserDets');
        const data= await collection.find().toArray();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json(error);
    }
}