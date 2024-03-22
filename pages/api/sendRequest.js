import { client } from "@/Database/handleDatabase";

export default async function sendResuest(req,res){
    if(req.method === "POST"){
        const {Request,user} = req.body;
        const mail = Request.split("@");
        const mail_id = mail[0];
        const userMail = user.email.split('@');

        const db = client.db(`${mail_id}`);
        const collection = db.collection("Request");
        const RequestsFriendCollection = db.collection("Friends");
        const usersDb = client.db(`${userMail[0]}`);
        const usersCollection = usersDb.collection('Request');
        const UsersFriednCollection = usersDb.collection("Friends");
        if(!await usersCollection.findOne({email:Request}) && (Request != user.email) && !await collection.findOne({email:user.email}) &&
        !await RequestsFriendCollection.findOne({email:user.email}) && !await UsersFriednCollection.findOne({email:Request})
        ){
            try{
                await collection.insertOne(user);
                res.status(200).json({Message:"Successfully request sended", success:"Yes"});
            }catch(error){
                res.status(500).json({Message:`Internal error ${error}`, success:"No"})
            }
        }else if(Request == user.email){
            res.status(200).json({Message:"Cannot send request to yourself", success:"No"} );
        }else if(await collection.findOne({email:user.email})){
            res.status(200).json({Message:"Already sended a request", success:"No"});
        }else if(await RequestsFriendCollection.findOne({email:user.email}) && await UsersFriednCollection.findOne({email:Request})){
            res.status(200).json({Message:"Already Friends", success:"No"});
        }else{
            res.status(200).json({Message:'alreday sended the request', success:"No"});
        }
        
    }
} 