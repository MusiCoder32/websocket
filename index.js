const express=require('express');
var app =express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3000);
var count=0;
io.on('connection', function(socket){
    socket.on('login',function(data){
        count++;
        socket.username=data;
        io.emit('loginsuccess',{title:"当前在线人数",count:count,msg:data+"进入了聊天室"})
    })
    socket.on('send', function(data){
        io.emit('msg',{"username":socket.username,"msg":data})
    }); // listen to the event
    socket.on('logout',function (data) {
        count--;
        io.emit("somelogout",{title:"当前在线人数",count:count,msg:data+"离开了聊天室"})
    })
});

app.use(express.static('static'))
app.get('/',(req,res)=>{
    res.send('hello world')
})
app.get('/index',(req,res)=>{
    res.sendFile(__dirname+'/static/1.html')
});