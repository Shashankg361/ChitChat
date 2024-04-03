import { client } from "@/Database/handleDatabase";

export default async function sendMessage(req,res){
    if(req.method === 'POST'){
        console.log("Api called");
        const {storeMessage,collectionName} = req.body;
        const db = client.db('Chat');
        const collecction = db.collection(`${collectionName}`);

        try{
            await collecction.insertOne(storeMessage);
            res.status(200).json({Message:"Send"});
        }catch(error){

            res.status(500).json({Message:"error occured"});
        }
    }
}