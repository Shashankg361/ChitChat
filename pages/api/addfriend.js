import { client } from "@/Database/handleDatabase";

export default async function addfriend(req,res){
    if(req.method){
        const {user,addFriend} = req.body;
        const {email,image,name} = user;
        const userMail = email.split("@");
        const FriendsMail = addFriend.email.split("@");
        const userdb = client.db(`${userMail[0]}`);
        const friendsDB = client.db(`${FriendsMail[0]}`);
        const userCollection = userdb.collection('Friends');
        const userCollectionRequest = userdb.collection('Request');
        const friendsCollection = friendsDB.collection('Friends');
        const chatDB = client.db("Chat");
        const chatCollectionName = userMail+FriendsMail;
        const FriendsData = {
            email:addFriend.email,
            image:addFriend.image,
            name:addFriend.name,
            collection:chatCollectionName,
        };
        const usersData = {
            email:email,
            image:image,
            name:name,
            collection:chatCollectionName,
        };
        try{
            await userCollection.insertOne(FriendsData);
            await friendsCollection.insertOne(usersData);
            await userCollectionRequest.deleteOne({email:addFriend.email});
            await chatDB.createCollection(`${chatCollectionName}`);
            res.status(200).json({Message:"Accepted request"});
        }catch(error){
            res.status(500).json({Message:`Internal server error ${error}`});
        }
    }
}