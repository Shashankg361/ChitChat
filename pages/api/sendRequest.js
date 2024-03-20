import { client } from "@/Database/handleDatabase";

export default async function sendResuest(req,res){
    if(req.method === "POST"){
        const {Request} = req.body;
        const mail = Request.split("@");
        const mail_id = mail[0];

        const db = client.db(`${mail_id}`);
        const collection = db.collection("Request");
        await collection.insertOne()
    }
} 