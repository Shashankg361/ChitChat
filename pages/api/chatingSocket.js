import { client } from "@/Database/handleDatabase";
import { Server } from "socket.io";

export default async function chatingSocket(req,res){
    const collectionName = req.query.collectionName;
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
                console.log("workinggg");
                const db = client.db('Chat');
                const collection = db.collection(`${collectionName}`);
                console.log("collname",collectionName);
                const changeStream = collection.watch();

                changeStream.on('change',(newData)=>{
                    console.log("onchange",newData);
                    if(newData.operationType === 'insert'){
                        socket.emit(`${collectionName}`,JSON.stringify(newData.fullDocument))
                    }
                });
            }catch(error){
                console.log(error);
            }
        });

    }
    res.end();
}