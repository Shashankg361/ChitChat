import { client } from "@/Database/handleDatabase";
import { Server } from "socket.io";

export default async function chatingSocket(req,res){
    const collectionName = req.query.collectionName;
    console.log("req...",req.query.collectionName);
    const db = client.db('Chat');
    var collection = db.collection(`${req.query.collectionName}`);
     
    if(res.socket.server.io){
        console.log('server is already running');
    }else{
        console.log('server initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connect',socket=>{
            console.log('connected');
            //const collectionName = socket.handshake.query.collectionName;
            try{
                
                console.log("collname",req.query.collectionName);
                const changeStream = collection.watch();

                changeStream.on('change',(newData)=>{
                    console.log("workinggg");
                    console.log("onchange",newData);
                    if(newData.operationType === 'insert'){
                        socket.emit(`${req.query.collectionName}`,JSON.stringify(newData));
                    }
                });
            }catch(error){
                console.log(error);
            }
        });
    }
    res.end();
}