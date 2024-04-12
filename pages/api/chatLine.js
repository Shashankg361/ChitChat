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

        socket.on('getUser',(data)=>{
          const UserData = JSON.parse(data);
          let friendsChangeStream = null;
          let requestChangeStream = null;
          try{
            const email = data.email;
            const dbName = email.split('@');
            const db = client.db(`${dbName[0]}`);
            const friendsCollection = db.collection('Friends');
            const requestCollection = db.collection('Request');

            friendsChangeStream && friendsChangeStream.close();
            requestChangeStream && requestChangeStream.close();
            friendsChangeStream = friendsCollection.watch();
            requestChangeStream = requestCollection.watch();

            friendsChangeStream.on('change',(newfriend)=>{
              if(newfriend.operationType == 'insert'){
                socket.emit('Firends',JSON.stringify(newfriend.fullDocument));
              }
            })

            requestChangeStream.on('change',async (change)=>{
              if(change.operationType == 'delete'){
                const data = await getRemainingDocs();
                socket.emit('Request',JSON.stringify({change,data}));
              }else if(change.operationType == 'insert'){
                const data = null;
                socket.emit('Request',JSON.stringify({change,data}));
              }
            })

            async function getRemainingDocs(){
              try{
                const data = await requestCollection.find().toArray();
                return data;
              }catch(error){
                console.log('Error occured at socket getRemainingDocs');
                return null;
              }
            }

          }catch(error){
            console.log('Error occured at socket getUser',error);
          }
        })
      
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
