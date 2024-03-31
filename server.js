// server.js
const http = require('http');
const { Server } = require('socket.io');
const { client } = require('./Database/handleDatabase');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', async(socket) => {
  console.log('a user connected');

    const get = socket.handshake.query.name;
    console.log("at Server",get);
    
    try{
        const db = client.db('Chat');
        const collection = db.collection(`${get}`);
        const changeStream = collection.watch();

        changeStream.on('change',(newData)=>{
            console.log("at change",get);
            console.log("Called",newData.fullDocument);
            if(newData.operationType == 'insert'){
                socket.emit(`${get}`,JSON.stringify(newData.fullDocument));
            }
        })
    }catch(error){
        console.log("socket Internal error",error);
    }

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
