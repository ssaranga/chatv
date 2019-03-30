const express = require('express'),
http = require('http'),
app = express(),
      
server = http.createServer(app),
io = require('socket.io').listen(server);
var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});
io.on('connection', (socket) =>  {
        
        console.log('user connected')
     
socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );
        
            
          
        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
        
    })


socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

       console.log(senderNickname+" :" +messageContent)
        //create a message object 
       let  message = {"message":messageContent, "senderNickname":senderNickname}
          // send the message to the client side  
       io.emit('message', message )
     
      })
     
 socket.on('disconnect', function() {
    console.log(userNickname + 'has left ')
    socket.broadcast.emit("userdisconnect",userNickname +" user has left ") 

})
 
 socket.on('playcontrol', function(mediaplaycontrol) {
    console.log( ' Video Play'+mediaplaycontrol)
    io.emit("mediacontrol",mediaplaycontrol) 

})




})





server.listen(server_port, server_ip_address,()=>{
console.log( "Listening on " + server_ip_address + ", server_port " + server_port  )


})
