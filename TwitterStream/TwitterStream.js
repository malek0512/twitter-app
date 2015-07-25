var config = require('./config.json');
var Twitter = require('node-tweet-stream');
var io = require('socket.io')(8081);



exports.open = function(){
	var TwitterStream = new Twitter(config);

	var nb = 0;
	io.on('connection', function(socket){
		TwitterStream.track('nodejs');
		TwitterStream.track('js');
		TwitterStream.on('tweet', function (tweet) {
			socket.emit('tweet', tweet);
			console.log(++nb);
		});
	});
	return TwitterStream;
};




