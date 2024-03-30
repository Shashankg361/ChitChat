// // pages/api/socket.js
// import { Server } from 'socket.io';

// export default async function handler(req, res) {
//   if (!res.socket.server.io) {
//     const httpServer = res.socket.server;
//     const io = new Server(httpServer, {
//       cors: {
//         origin: '*',
//       },
//     });

//     io.on('connection', (socket) => {
//       console.log('a user connected');

//       socket.on('disconnect', () => {
//         console.log('user disconnected');
//       });
//     });

//     res.socket.server.io = io;
//   }

//   res.end();
// }
