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
  socket.on('join', (room) => {
    console.log('join');
    socket.join(room);
    socket.to(room).emit('ready', '準備通話');
  });

  // 轉傳 Offer
  socket.on('offer', (room, description) => {
      socket.to(room).emit('offer', description);
  });

  // 轉傳 Answer
  socket.on('answer', (room, description) => {
      socket.to(room).emit('answer', description);
  });

  // 交換 ice candidate
  socket.on('ice_candidate', (room, data) => {
      socket.to(room).emit('ice_candidate', data);
  });

  // 關閉通話
  socket.on('hangup', (room) => {
      console.log('hangup');
      socket.leave(room);
  });
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
