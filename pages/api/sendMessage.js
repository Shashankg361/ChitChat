import { client } from "@/Database/handleDatabase";

export default async function sendMessage(req,res){
    if(req.method === 'POST'){
        const {storeMessage,collecctionName} = req.body;
        const db = client.db('Chat');
        const collecction = db.collection(`${collecctionName}`);

        try{
            await collecction.insertOne(storeMessage);
            res.status(200).json({Meessage:"Send"});
        }catch(error){
            res.status(500).json({Message:"error occured"});
        }
    }
}