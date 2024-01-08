const express =require('express')
const cors = require('cors')
const { Server } = require("socket.io");
const http = require('http');
const app = express();
 

app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
})
io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.on("newMessage",({newMessage,room})=>{
      console.log(room,newMessage)

      io.in(room).emit("getLatestMessage",newMessage)


    })
  });

});

app.get('/',(req,res)=>{
  res.send("Hello")
})


server.listen(8000,()=>{
  console.log('Server Started')
})