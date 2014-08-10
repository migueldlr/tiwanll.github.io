<?php
class Car {
	public $make;
	public $model;
	public $year;
	public $color;
	public $engine;
	
	function __construct($make, $model, $year, $color, $engine){
		$this->make = $make;
		$this->model = $model;
		$this->year = $year;
		$this->color = $color;
		$this->engine = $engine;
	}
}

class Engine{
	public $cylinders;
	public $size;
	
	function __construct($cylinders, $size){
		$this->cylinders = $cylinders;
		$this->size = $size;
	}
}

$car = new Car("Ford", "Mustang", 1974, "Yellow", new Engine(12, "4L"));
echo json_encode($car);

?>