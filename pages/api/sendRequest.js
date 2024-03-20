import { client } from "@/Database/handleDatabase";

export default async function sendResuest(req,res){
    if(req.method === "POST"){
        const {Request,user} = req.body;
        const mail = Request.split("@");
        const mail_id = mail[0];

        const db = client.db(`${mail_id}`);
        const collection = db.collection("Request");
        try{
            await collection.insertOne(user);
            res.status(200).json({Message:"Successfully request sended"});
        }catch(error){
            res.status(200).json({Message:`Internal error ${error}`})
        }
    }
} 