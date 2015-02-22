var io = require('socket.io').listen(5001);
var redis = require('redis').createClient();

redis.subscribe('rt-change');

console.log('starting app');

io.on('connection', function(socket){
  console.log('client connected');
  redis.on('message', function(channel, message){
    console.log(message);
    socket.emit('rt-change', JSON.parse(message));
  });
});
