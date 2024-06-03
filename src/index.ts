import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from './types'
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = new Server<
ClientToServerEvents,
ServerToClientEvents
>(server, {
  cors: {
    origin : 'http://localhost:3000',
    methods: ["GET"],  
  },
})
app.use(cors({
  origin : 'http://localhost:3000',
  methods: ["GET"],
}))
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('connecting')
  const socketIdsInRoom = async (roomID: string) => {
    const sockets = await io.in(roomID).allSockets();
    console.log('sockets => ',sockets);
    return Array.from(sockets);
  };
  const findNowRoom = (client: any) => {
    return Object.keys(client.rooms).find(item => {
      return item !== client.id
    });
  }
  socket.on('join', async (roomID) => {
    try {
      socket.join(roomID);
    } catch (error) {
      console.error('Error getting clients in room:', error);
    }
  });

  socket.on("exchange", data => {
    const nowRoom = findNowRoom(socket);
    socket.to(String(nowRoom)).emit('exchange', data)
  });
  socket.on("disconnect", async () => {
    console.log('disconnect');
    
  });
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
