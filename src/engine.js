

	//Game Screen - Handles Canvas, Output etc..

	function GameScreen(canvasId) {
		this.canvasEl = document.getElementById(canvasId);
		this.canvas = this.canvasEl.getContext('2d');
	} 

    GameScreen.prototype.width = function() {
		return parseInt(atgHelpers.getElementAttribute(this.canvasEl, 'width'));
	}

	GameScreen.prototype.height = function() {
		return parseInt(atgHelpers.getElementAttribute(this.canvasEl, 'height'));
	}	

	GameScreen.prototype.clear = function() {
		this.canvas.clearRect(0, 0, this.width(), this.height());
	}

	GameScreen.prototype.drawImage = function() {
			
		
	}


	//Game Clock

	var atgClock = {
		
		gameObject: null,
		startTime: null,

		init: function(arguments) {
			this.gameObject = arguments.gameObject;
			this.canvas = this.gameObject.screen.canvasEl;
		},

		callGameLoop: function() {

				this.gameObject.update();
				this.gameObject.draw();
		},

		start: function() {

			this.startTime = new Date;
			
			var mainloop = function() {
				
		  		return atgClock.callGameLoop(); 
		    };

		    var animFrame = window.requestAnimationFrame ||
		            window.webkitRequestAnimationFrame ||
		            window.mozRequestAnimationFrame    ||
		            window.oRequestAnimationFrame      ||
		            window.msRequestAnimationFrame     ||
		            null ;

		    if ( animFrame !== null ) {
		        var canvas = this.canvas;

		        if ( BrowserDetect.browser === 'Firefox' ) {
		            var recursiveAnim = function() {
		                mainloop();
		                animFrame();
		            };

		            // setup for multiple calls
		            window.addEventListener("MozBeforePaint", recursiveAnim, false);

		            // start the mainloop
		            animFrame();
		        } else {
		            var recursiveAnim = function(a) {		    
		                mainloop();
		                animFrame( recursiveAnim, canvas );
		            };

		            // start the mainloop
		            animFrame( recursiveAnim, canvas );
		        }
		    } else {
		        setInterval( mainloop, this.skipTicks );
		    }		
		},

		stop: function() {
			
		}


	}



	//Game Engine - 42

	function atGame(arguments) {
		this.sceneCollection = new SceneCollection();
		this.screen = new GameScreen(arguments.canvas);
		this.mainScene = arguments.mainScene || 0;
		//Iitlizalize Sound Manager Singleton
		SoundManager.init();
		SceneManager.init({screen: this.screen});
		Controls.init({element: this.screen.canvasEl});
		atgClock.init({gameObject : this});

		if (typeof arguments.cursor !== 'undefined' && arguments.cursor == false) {
				this.screen.canvasEl.style.cursor = 'none';
		}

		
	} 


	atGame.prototype.create = function() {
		//Init
		SceneManager.nextScene();
		this.init();	
		atgClock.start();
	}


	atGame.prototype.init = function() {
			
	}

	atGame.prototype.update = function() {
		SceneManager.updateScene();
	}

	atGame.prototype.draw = function() {
		this.screen.clear();
		SceneManager.drawScene();
	}
