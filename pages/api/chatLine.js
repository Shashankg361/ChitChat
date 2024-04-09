// pages/api/socket.js
import { client } from '@/Database/handleDatabase';
import { Server } from 'socket.io';

export default async function handler(req, res) {
  console.log("working");
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;
    const io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        let changeStream = null;
      
          socket.on('user-changed',(collection)=>{
            const collectionName = JSON.parse(collection);
            //console.log("at Server",collectionName);
            try{
              const db = client.db('Chat');
              const collection = db.collection(`${collectionName}`);
      
              changeStream && changeStream.close();
      
              changeStream = collection.watch();
      
              changeStream.on('change',(newData)=>{
                  //console.log("at change",collectionName);
                  //console.log("Called",newData.fullDocument);
                  if(newData.operationType == 'insert'){
                    socket.emit(`${collectionName}`,JSON.stringify(newData.fullDocument));
                  }
              })
            }catch(error){
                console.log("socket Internal error",error);
            }
          });
        socket.on('disconnect', () => {
            console.log('user disconnected');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
