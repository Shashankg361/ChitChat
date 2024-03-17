import { client } from "@/Database/handleDatabase";

export default async function addNewUser(req,res){
    if(req.method == 'POST'){
        const {data} = req.body;
        try{
            const Userdb = client.db('User');
            const collection = Userdb.collection('UserDets');
            await collection.insertOne({User:data.user});
            try{
                const Newdb = client.db(`${data.user.name}`);
                await Newdb.createCollection('Friends');
                await Newdb.createCollection('Request');
            }catch(error){
                console.log("Error",error);
            }
            res.status(200).json({Message:'successfull'});
        }catch(error){
            res.status(500).json({Message:"Internal server error"});
        }
    }
}