import { client } from "@/Database/handleDatabase";
import { Server } from "socket.io";

export default async function chatingSocket(req,res){
    const collectionName = req.query.collectionName;
    console.log("collname",collectionName);
    if(res.socket.server.io){
        console.log('server is already running');
    }else{
        console.log('server initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connect',async(socket)=>{
            console.log("working");
            //const collectionName = socket.handshake.query.collectionName;
            

            try{
                const db = client.db("chat");
                const collection = db.collection(`${collectionName}`);
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