function Car(name, ppg, tank, color, speed) {

	  this.x = 0;
	  this.y = (carList.length * (CAR_HEIGHT + CAR_SPACING));
	  this.height = CAR_HEIGHT;
	  this.width = CAR_WIDTH;

	  this.name = name;
	  this.ppg = ppg;
	  this.tank = tank;
	  this.odometer = 0;
	  this.fuel = this.tank;
	  this.color = color;
	  this.speed = speed;

	  this.moveCost = speed/ppg;

	  carList[carList.length] = this;

	  this.draw = function() {

		  ctxt.fillStyle = this.color;
		  ctxt.fillRect(this.x,this.y,this.width,this.height);

	  }

	  this.canMove = function() {

		  if(this.fuel >= this.moveCost) {

			  return true;

		  }

		  return false;

	  }

	  this.move = function() {

		  if(this.canMove()) {

			  this.x += this.speed;
			  this.odometer += this.speed;
			  this.fuel -= this.moveCost; 

			if(this.x >= document.getElementById('output').width) {

				document.getElementById('output').width += CAR_WIDTH * 4;

			}

		  }

		  redraw();

	  }

	  this.getName = function() {

		  return this.name;

	  }

	  this.getOdometer = function() {

		  return this.odometer;

	  }

	  this.setx = function(n) {

		  this.x = n;

	  }

	  this.sety = function(n) {

		  this.y = y;

	  }

	  this.setfuel = function(n) {

		  this.fuel = n;

	  }

  }
  
  
  
  

  
  
  
