// // server.js
// const http = require('http');
// const { Server } = require('socket.io');
// const { client } = require('./Database/handleDatabase');

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', async(socket) => {
//   console.log('a user connected');

//   let changeStream = null;

//     // const collectionName = socket.handshake.query.name;

//     socket.on('user-changed',(collection)=>{
//       const collectionName = JSON.parse(collection);
//       console.log("at Server",collectionName);
//       try{
//         const db = client.db('Chat');
//         const collection = db.collection(`${collectionName}`);

//         changeStream && changeStream.close();

//         changeStream = collection.watch();

//         changeStream.on('change',(newData)=>{
//             console.log("at change",collectionName);
//             console.log("Called",newData.fullDocument);
//             if(newData.operationType == 'insert'){
//               socket.emit(`${collectionName}`,JSON.stringify(newData.fullDocument));
//             }
//         })
//       }catch(error){
//           console.log("socket Internal error",error);
//       }
//     });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// const PORT = process.env.NEXT_PUBLIC_PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
