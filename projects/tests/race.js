function race(car1, car2) {
	this.car1 = car1;
	this.car2 = car2;
	this.raceLength = 500;
	this.go = function() {
		while(car1.getOdometer() < this.raceLength && car2.getOdometer() < this.raceLength) {
			moveCars(car1, car2);
		}
		if(car1.getOdometer() > car2.getOdometer()) {
			alert(car1.getName() + " beat " + car2.getName());
		}else if(car2.getOdometer() > car1.getOdometer()) {
			alert(car2.getName() + " beat " + car1.getName());
		}else {
			alert(car1.getName() + " tied " + car2.getName());
		}

	}
	this.movecars = function() {
		car1.move();
		car2.move();
		redraw();
	}
}
