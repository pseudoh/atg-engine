//Game Scene

function Scene(arguments) {
	this.screen = arguments.screen;	
}

Scene.prototype.init = function() {
	
}


Scene.prototype.update = function() {
	
}

Scene.prototype.draw = function() {
	
}

//Scene Collection

function SceneCollection() {
	this.scenes = new Array();		
}	

SceneCollection.prototype.add = function(scene) {
	this.count += this.scenes.push(scene);
	return scene;
}

SceneCollection.prototype.remove = function(index) {
	return this.scenes.splice(index, 1);
}

SceneCollection.prototype.get = function(index) {
	if (this.scenes.length > index) {
		return this.scenes[index];
	} else {
		return null;
	}
} 

SceneCollection.prototype.length = function() {
	return this.scenes.length;
}


//Scene Manager Singleton

var SceneManager = {

	scenes: new SceneCollection(),
	currentSceneIndex: -1, //Current Scene Number
	arguments : null,

	init: function(arguments) {
		this.arguments = arguments;	
	},

	gotoScene: function(index) {
			
	}, 

	nextScene: function() {
		var scenesCount = this.scenes.length();
		if (scenesCount !== 0 && this.currentSceneIndex < scenesCount) {
			this.currentSceneIndex++;
			var scene = this.scenes.get(this.currentSceneIndex);
			scene.init();
		}	
	},

	previousScene: function() {
		
	},

	createScene: function() {
		return this.scenes.add(new Scene({screen: this.arguments.screen}));
	}, 

	updateScene: function() { //Updates Active Scene
		this.scenes.get(this.currentSceneIndex).update();
	}, 

	drawScene: function() { //Draws Active Scene
		this.scenes.get(this.currentSceneIndex).draw();	
	}, 
};

