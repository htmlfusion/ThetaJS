var theta = require('./index')

theta.connect();
theta.startSession()
	.then(function(){
		console.log(theta.sessionId);
		var foo = theta.camera.getOptions(theta.sessionId, theta.options)
			.then(function(res){
				console.log(res.body.results);
			})
			.error(function(err){
				console.log(err);
			});

		console.log(foo);
	});

