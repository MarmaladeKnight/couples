var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 2000;
var messeges = []

app.use(express.static('client/build/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html');
});

io.on('connection', function (socket) {
  console.log("connceted");
  socket.emit('new_user', "My awesome name");

  socket.on('chat message', function (msg) {
    messeges.push(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});