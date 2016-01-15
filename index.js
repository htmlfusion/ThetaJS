var OscClientClass = require('osc-client').OscClient,
	domain = '192.168.1.1',
  port = '80',
  options = ["aperture","_captureInterval","captureMode","_captureNumber",
		"dateTimeZone","exposureCompensation","exposureProgram","fileFormat",
		"_filter","gpsInfo","_HDMIreso","iso","offDelay","remainingPictures",
		"remainingSpace","_remainingVideos","shutterSpeed","_shutterVolume",
		"sleepDelay","totalSpace","whiteBalance","_wlanChannel"
	];

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

var connect = function() {
  var camera = new OscClientClass(domain, port)
	module.exports.camera = camera;
}

var startSession = function() {
	var prom = module.exports.camera.startSession();
	prom.then(function(res) {
		module.exports.sessionId = res.body.results.sessionId
	});
	return prom;
}

module.exports = {
	camera: null,
	connect: connect,
	startSession: startSession,
	sessionId: null,
	options: options
}

