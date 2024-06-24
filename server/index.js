const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    console.log("user connected",socket.id);

    socket.on("join_room",(data)=>{
        console.log(`username ${socket.id} joining this room ${data.roomId}`);
        socket.join(data.roomId);
    })
    socket.on("send_message",(data)=>{
        console.log(`received message ${data.message} from user ${data.sender}`)
        socket.to(data.roomId).emit("receive_message",data);
    })
    socket.on('disconnect',(user)=>{
        console.log("disconnnect the username",user)
    })
})
server.listen(5000,"localhost",()=>{
    console.log("server listening on port 5000")
})