var config = require('./config.json');
var Twitter = require('node-tweet-stream');
var io = require('socket.io')(8081);



exports.open = function(){
	var TwitterStream = new Twitter(config);
	io.on('connection', function(socket){
		console.log('user connected')
		TwitterStream.track('twitter');
		TwitterStream.on('tweet', function (tweet) {
			console.log('tweeting', tweet.id);
			if(tweet.geo || tweet.coordinates || tweet.place) {
				socket.emit('tweet', tweet);
			}
		});

		socket.on('disconnect', function(){
			console.log('user disconnected')
			TwitterStream.untrack('twitter');
		});
	});
	return TwitterStream;
};


exports.open();