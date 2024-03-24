import { client } from "@/Database/handleDatabase";

export default async function getChat(req,res){
    if(req.method==='POST'){
        const {collectionName} = req.body;
        const db = client.db("Chat");
        const collection = db.collection(`${collectionName}`);
        try{
            const response = await collection.find().toArray();
            res.status(200).json({data:response});
        }catch(error){
            res.status(500).json({Message:"Internal server error"});
        }
    }
}