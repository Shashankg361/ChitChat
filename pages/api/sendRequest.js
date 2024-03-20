import { client } from "@/Database/handleDatabase";

export default async function sendResuest(req,res){
    if(req.method === "POST"){
        const {Request,user} = req.body;
        const mail = Request.split("@");
        const mail_id = mail[0];

        const db = client.db(`${mail_id}`);
        const collection = db.collection("Request");
        if(!await collection.findOne({email:Request}) && (Request != user.email) ){
            try{
                await collection.insertOne(user);
                res.status(200).json({Message:"Successfully request sended"});
            }catch(error){
                res.status(200).json({Message:`Internal error ${error}`})
            }
        }else if(Request == user.email){
            res.status(200).json({Message:"Cannot send request to yourself"})
        }
        else{
            res.status(200).json({Message:'alreday sended request'});
        }
        
    }
} 