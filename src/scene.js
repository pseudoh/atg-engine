//Game Scene

function atgScene(arguments) {
	this.screen = arguments.screen;	
	this.objects = new atgCollection();
}

atgScene.prototype.init = function() {
}

atgScene.prototype.updateInternal = function() {
	this.objects.each(function(obj) {
		obj.update();
	});

	this.update();
}

atgScene.prototype.draw = function() {
	this.objects.each(function(obj) {
		obj.draw();
	});
}

atgScene.prototype.addObject = function(obj) {
	obj.assignScreen(this.screen);
	this.objects.add(obj);
}



//Scene Manager Singleton

var SceneManager = {

	scenes: new atgCollection(),
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
		return this.scenes.add(new atgScene({screen: this.arguments.screen}));
	}, 

	updateScene: function() { //Updates Active Scene
		this.scenes.get(this.currentSceneIndex).updateInternal();
	}, 

	drawScene: function() { //Draws Active Scene
		this.scenes.get(this.currentSceneIndex).draw();	
	}, 
};

