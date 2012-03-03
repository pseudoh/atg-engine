
// Sound Object - Not to be used directly. Use SoundManager instead
//@soundFile: Path to supported sound file
//@preload: Set to true if sound must be preloaded first

function atgSound(soundFile, preload, autoplay, onend) {

	this.audio = new Audio(soundFile);
	this.playing = false;
	this.soundFile = soundFile;
	this.onEndHandler = onend || null;

	if (typeof preload !== 'undefined' && preload == true) {
		this.audio.preload = 'auto';
	}

	if (typeof autoplay !== 'undefined' && autoplay == true) {
		this.audio.autoplay = 'autoplay';
	}

	var trackCompleted = function(soundObject) {
		soundObject.playing = false	
		if (soundObject.onEndHandler !== null) {
			soundObject.onEndHandler();
		}
	}
	
	this.audio.addEventListener('ended', trackCompleted(this), false);
}

atgSound.prototype.loop = function(enable) {
	this.audio.loop = enable;
}

atgSound.prototype.play = function() {
	this.audio.play();
	this.playing = true;
}

atgSound.prototype.pause = function() {
	this.audio.pause();
	this.playing = false;
}

atgSound.prototype.stop = function() {
	this.audio.src = this.soundFile;
	this.audio.pause();
	this.playing = false;
}










var SoundManager = {

	soundCollection : new Array(),

	init: function() {
		
	},

	//sound: path to sound file
	//duration: duration to play sound in milliseconds
	load: function(soundFile, attributes) {

		var attributes = attributes || null;
		var preload = true, autoplay = false,loop = false, startat = 0, duration = 0, onEndHandler = null;
	
		if (attributes !== null) {
			preload = attributes.preload || preload;
			autoplay = attributes.autoplay || autoplay;
			startat = attributes.startat || startat;
			duration = attributes.duration || duration;
			loop = attributes.loop || loop;
			onEndHandler = attributes.onend || onEndHandler;
		}

		var audio = new atgSound(soundFile, preload, autoplay, onEndHandler);

		if (!autoplay && startat !== 0) {	
			setTimeout(function() {audio.play()}, parseInt(startat));
		}

		if (duration !== 0) {
			setTimeout(audio.stop, parseInt(duration));
		}

		if (loop) {
			audio.loop = loop;
		}

		var soundIndex = this.soundCollection.push(audio) - this.soundCollection.length;

		return audio;
	}, 

	preloadSound: function(sound, attributes) {
		return  SoundManager.playSound(sound, true, attributes);
		
	},

	stopSound: function(index) {
		console.log('Ended '+index);
		this.soundCollection[index].pause();
		this.soundCollection[index].src = '';
		this.soundCollection.pop(index);
	}, 

	stopAll: function() {
		for (var i = 0; i < this.soundCollection.length; i++) { 
			this.stopSound(i);
		}
	}

};