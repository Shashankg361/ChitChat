import { client } from "@/Database/handleDatabase";

export default async function getRequest(req,res){
    if(req.method==='POST'){
        const {email} = req.body;
        //console.log("at getrequest",email);
        const mail = email.split("@");
        const mail_id = mail[0];
        const db = client.db(`${mail_id}`);
        const collection = db.collection("Request");
        try{
            const response = await collection.find().toArray();
            //console.log("data",response);
            res.status(200).json({data:response});
        }catch(error){
            console.log("errorororo at getRequest",error);
            res.status(500).json({error});
        }
    }
}