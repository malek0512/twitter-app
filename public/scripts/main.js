(function(io){
	var counterContainer = document.querySelector('#countCountainer');
	var tweets = [];
	var socket = io('http://localhost:8081');
	socket.on('tweet', function(tweet){
		tweets.push(tweet);
		counterContainer.innerHTML = tweets.length;
	});
})(io);