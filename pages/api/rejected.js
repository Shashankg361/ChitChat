import { client } from "@/Database/handleDatabase";

export default async function rejected(req,res){
    if(req.method==='PSOT'){
        const {user,addFriend} = req.body;
        const usermail = user.email.split('@');
        const userdb = client.db(`${usermail[0]}`);
        const friednmail = addFriend.email;
        const collection = userdb.collection('Request');
        try{
            await collection.deleteOne({email:friednmail.email});
            res.status(200).json({Message:"Rejected"});
        }catch(error){
            res.status(500).json({Message:`Internal server error ${error}`});
        }
    }
}