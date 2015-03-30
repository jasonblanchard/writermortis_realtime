var io = require('socket.io').listen(process.env.PORT || process.env.APP_PORT);
console.log("Socket.io Listening on " + (process.env.PORT || process.env.APP_PORT));

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else {
  var redis = require('redis').createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
}

redis.subscribe('rt-change');

console.log('starting app');

io.on('connection', function(socket){
  console.log('client connected');
  redis.on('message', function(channel, message){
    console.log(message);
    socket.emit('rt-change', JSON.parse(message));
  });
});
