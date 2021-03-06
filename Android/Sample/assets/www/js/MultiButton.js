// TODO: Allow Canvas drawing instead of individual children... for large numbers of children this gets too slow.

function MultiButton(ctx, props) {
	this.ctx = ctx;
	this.widthInPercentage  = props.width;
	this.heightInPercentage = props.height;

    this.mode    = (typeof props.mode != "undefined") ? props.mode : "toggle";
	this.children = new Array();
	
	this.__proto__ = new Widget(ctx,props);

	this.origX = props.x;
	this.origY = props.y;
	
	this.rows    = (typeof props.rows    != "undefined") ? props.rows    : 2;
	this.columns = (typeof props.columns != "undefined") ? props.columns : 2;
	
	this.buttonWidth = this.widthInPercentage / this.columns;
	this.buttonHeight = this.heightInPercentage / this.rows;
	
	this.buttonWidthInPixels = parseInt(this.width) / this.columns;
	this.buttonHeightInPixels = parseInt(this.height) / this.rows;
	
	//debug.log("width = " + this.buttonWidthInPixels + " :: height = " + this.buttonHeightInPixels);
    
	this.requiresTouchDown = (typeof props.requiresTouchDown == "undefined") ? true : props.requiresTouchDown;

	this.init = function() {
		for(var i = 0; i < this.rows; i++) {
			var _y = this.buttonHeight * i;
			
			for(var j = 0; j < this.columns; j++) {
				var _x = this.buttonWidth * j;
				var newProps = {
					"x":this.origX + _x,
					"y":this.origY + _y,
					"width":this.buttonWidth, 
					"height":this.buttonHeight,
					"color":this.color,
					"stroke":this.stroke,
					"min":this.min,
					"max":this.max,
					"startingValue":this.value,
					"midiStartingValue":this.value,
					"midiMin":this.min,
					"midiMax":this.max,
                    "mode":this.mode,
					"ontouchstart":this.ontouchstart,
					"ontouchmove":this.ontouchmove,
					"ontouchend":this.ontouchend,
                    "onvaluechange":this.onvaluechange,
					"isLocal":this.isLocal,
					"requiresTouchDown":this.requiresTouchDown,
					"midiType":(typeof this.midiType == "undefined") ? "cc" : this.midiType,
					"channel":(typeof this.channel != "undefined") ? this.channel : 1,
				};
				
				var _w = new Button(this.ctx, newProps);
				_w.address    = this.address + "/" + ((i * this.columns) + j);
				_w.midiNumber = this.midiNumber + ((i * this.columns) + j);
				
				this.children.push(_w);
			}						
		}
	}
	
	this.draw = function() {
		for(var i = 0; i < this.children.length; i++) {
			var _w = this.children[i];
			_w.draw();
		}
	}
	
	this.show = function() {
		for(var i = 0; i < this.children.length; i++) {
			var _w = this.children[i];
			_w.show();
		}
	}
	
	this.hide = function() {
		for(var i = 0; i < this.children.length; i++) {
			var _w = this.children[i];
			_w.hide();
		}
	}
	
	this.event = function(event) {
		if(event.type == "touchstart") {
			for (var j = 0; j < event.changedTouches.length; j++){
				var touch = event.changedTouches.item(j);
				
				var colNumber = Math.floor((touch.pageX - this.x) / this.buttonWidthInPixels);
				if(colNumber < 0 || colNumber > this.columns) return;
				
				var rowNumber = Math.floor((touch.pageY - this.y) / this.buttonHeightInPixels);
				if(rowNumber < 0 || rowNumber > this.rows) return;
				
				var buttonNumber = (rowNumber * this.columns) + colNumber;
				
				if(this.children[buttonNumber] != null && typeof this.children[buttonNumber] != "undefined")
					this.children[buttonNumber].event(event);
			}
		}else{
			for(var i = 0; i < this.children.length; i++) {
				var _w = this.children[i];
				_w.event(event);
			}
		}
    }
	//			window.monome.setValue(buttonNumber, args[2], false);

	this.setValue = function(buttonNumber, value) {
		var _w = this.children[buttonNumber];
		if(arguments[2] === false) {
			_w.setValue(value, false);
		}else{
			_w.setValue(value);
		}
	}

		
	return this;
}