const { Socket } = require('dgram');
const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
    
})

io.on('connection',(socket)=>{
    console.log("user connected",socket.id);

    socket.on("join_room",(data)=>{
        console.log(`socketID: ${socket.id} username:${data.username} joining this room ${data.room}`);
        socket.join(data.room)
    })
    socket.on("send_message",(message)=>{
        console.log(`message data`,message);
            socket.to(message.room).emit("receive_message",message)
    })
    socket.on('disconnect',(reason)=>{
        console.log("disconnnect the username",reason)
    })
})
server.listen(5000,"localhost",()=>{
    console.log("server listening on port 5000")
})