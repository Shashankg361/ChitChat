import { client } from "@/Database/handleDatabase";
import { Server } from "socket.io";

export default async function chatingSocket(req,res){
    if(res.socket.server.io){
        console.log('server is already running');
    }else{
        console.log('server initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection',async(socket)=>{
            const collectionName = socket.handshake.query.collectionName;

            try{
                const db = client.db("chat");
                const collection = db.collection(`${collectionName}`);
                const changeStream = collection.watch();

                changeStream.on('change',(newData)=>{

                })
            }catch(error){
                
            }
        })

    }
}