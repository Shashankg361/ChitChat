import { client } from "@/Database/handleDatabase";

export default async function getFriendsList(req,res){
    if(req.method === 'POST'){
        const {email} = req.body;
        const mail_Id = email?.split("@");
        console.log("mail",mail_Id[0]);
        const db = client.db(`${mail_Id[0]}`);
        const collection = db.collection("Friends");
        try{
            const List = await collection.find().toArray();
            console.log("getList",List);
            res.status(200).json({Message:"successfull",data:List});
        }catch(error){
            console.log("Error in get Friends api ",error);
            res.status(500).json({Message:`Error Occured ${error}`,data:null});
        }

    }
}