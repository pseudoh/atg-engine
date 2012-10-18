var atgObject = Class.extend({
construct: function() {
	this.screen = null;
	this.rotationAngle = 0;
	this.position = {
		x: 0,
		y: 0
	};
	this.size = {
		width: 0,
		height: 0
	};
	this.confineArea = {
		x1 : null, y1 : null, 
		x2 : null, y2 : null
	};
},
update: function() {

	if (this.confineArea.x1 != null) {
		var confineWidth = this.confineArea.x2 - this.size.width;
		var confineHeight = this.confineArea.y2 - this.size.height;
		if (this.position.x < this.confineArea.x1) {
			this.position.x = this.confineArea.x1;
		}
		if (this.position.x > confineWidth) {
			this.position.x = confineWidth;
		}
		if (this.position.y < this.confineArea.y1) {
			this.position.y = this.confineArea.y1;
		}
		if (this.position.y > confineHeight) {
			this.position.y = confineHeight;
		}
	}
},
draw: function() {

},
assignScreen: function(screen) {
	this.screen = screen;
}, 
confine: function(x1, y1, x2, y2) {
	this.confineArea.x1 = x1;
	this.confineArea.x2 = x2;
	this.confineArea.y1 = y1;
	this.confineArea.y2 = y2;
},
rotate: function(angle, x, y) {
	if (angle < 0 || angle > 360) 
		angle = 0;
	this.rotationAngle = {angle: angle, x: x, y:y};
}
});

var atgoRectangle = atgObject.extend({
	construct: function(width, height, x, y) {
		this._super();
		this.size.width = width;
		this.size.height = height;
		this.position.x = x;
		this.position.y = y;
	},
	update: function() {
		//this.position.x = Controls.mouseX - (this.size.width / 2);
		//this.position.y = Controls.mouseY - (this.size.height / 2);

		return this._super();
	}, 
	draw: function() {
		this.screen.canvas.fillStyle = 'black';
		this.screen.drawRect(this.position.x, this.position.y , this.size.width, this.size.height, 
			this.rotationAngle);

		return this._super();
	}

});


var atgoCircle= atgObject.extend({
	construct: function(radius, x, y) {
		this._super();
		this.radius = radius;
		this.position.x = x;
		this.position.y = y;
	},
	update: function() {
		//this.position.x = Controls.mouseX - (this.size.width / 2);
		//this.position.y = Controls.mouseY - (this.size.height / 2);

		return this._super();
	}, 
	draw: function() {
		this.screen.canvas.fillStyle = 'black';
		this.screen.drawCircle(this.radius, this.position.x, this.position.y);

		return this._super();
	}

});