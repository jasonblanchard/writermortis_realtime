var io = require('socket.io').listen(process.env.APP_PORT || process.env.PORT);
console.log("Socket.io Listening on " + (process.env.APP_PORT || process.env.PORT));

if (process.env.REDISTOGO_URL) {
  console.log("Using REDISTOGO_URL");
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else {
  console.log("Using localhost");
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
