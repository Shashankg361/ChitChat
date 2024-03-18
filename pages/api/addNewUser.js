import { client } from "@/Database/handleDatabase";

export default async function addNewUser(req,res){
    if(req.method == 'POST'){
        const {data} = req.body;
        try{
            const Userdb = client.db('User');
            const collection = Userdb.collection('UserDets');
            const {name,email,image} = data.user;
            try{
                if(!await collection.findOne({email:email})){
                    await collection.insertOne(data.user);
                    try{
                        const email = data.user.email;
                        const email_id = email.split("@");
                        const Newdb = client.db(`${email_id[0]}`);
                        await Newdb.createCollection('Friends');
                        await Newdb.createCollection('Request');
                    }catch(error){
                        console.log("Error",error);
                    }
                }
            }catch(error){
                console.log("error occured while storing");
            }
            
            
            res.status(200).json({Message:'successfull'});
        }catch(error){
            res.status(500).json({Message:`Internal server error ${error}`});
        }
    }
}