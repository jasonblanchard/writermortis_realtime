var io = require('socket.io').listen(process.env.APP_PORT);
var redis = require('redis').createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis.subscribe('rt-change');

console.log('starting app');

io.on('connection', function(socket){
  console.log('client connected');
  redis.on('message', function(channel, message){
    console.log(message);
    socket.emit('rt-change', JSON.parse(message));
  });
});
