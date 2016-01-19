var _ = require('lodash'),
  OscClientClass = require('osc-client').OscClient,
	domain = '192.168.1.1',
  port = '80',
  options = ["aperture","_captureInterval","captureMode","_captureNumber",
		"dateTimeZone","exposureCompensation","exposureProgram","fileFormat",
		"_filter","gpsInfo","_HDMIreso","iso","offDelay","remainingPictures",
		"remainingSpace","_remainingVideos","shutterSpeed","_shutterVolume",
		"sleepDelay","totalSpace","whiteBalance","_wlanChannel"
	],
	exposureProgram = {
		MANUAL: 1,
		NORMAL: 2,
		SHUTTER: 4,
		ISO: 9
	},
	shutterSpeed = [ 0.00015625, 0.0002, 0.00025, 0.0003125, 0.0004, 0.0005, 0.000625, 0.0008, 0.001, 0.00125,
    0.0015625, 0.002, 0.0025, 0.003125, 0.004, 0.005, 0.00625, 0.008, 0.01, 0.0125, 0.01666666, 0.02, 0.025,
    0.03333333, 0.04, 0.05, 0.06666667, 0.07692307, 0.1, 0.125, 0.16666666, 0.2, 0.25, 0.33333333, 0.4, 0.5,
    0.625, 0.76923076, 1, 1.3, 1.6, 2, 2.5, 3.2, 4, 5, 6, 8, 10, 13, 15, 20, 25, 30, 60 ];

var connect = function() {
  var camera = new OscClientClass(domain, port);
	module.exports.camera = camera;
};

var startSession = function() {
	var prom = module.exports.camera.startSession();
	prom.then(function(res) {
		module.exports.sessionId = res.body.results.sessionId
	});
	return prom;
};


var exposureIndex = function(speed) {
  var closestMatches = _.orderBy(shutterSpeed, function(s){return Math.abs(s-speed)});
  return shutterSpeed.indexOf(closestMatches[0]);
}


module.exports = {
	camera: null,
	connect: connect,
	startSession: startSession,
	sessionId: null,
	options: options,
	exposureProgram: exposureProgram,
	shutterSpeed: shutterSpeed,
  exposureIndex: exposureIndex
}

