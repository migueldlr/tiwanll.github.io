/* Author: Aaron Weeden, Shodor, 2014 */

var N_ROWS = 15;
var N_COLS = 15;
var WIDTH  = 32;
var HEIGHT = 32;
var INTERVAL_SIZE = 100;

function Agent(cssClass, makeChance, eatChance, reprodChance,
		reprodHunger, highestRow) {
	this.cssClass     = cssClass;
	this.makeChance   = makeChance;
	this.eatChance    = eatChance;
	this.reprodChance = reprodChance;
	this.reprodHunger = reprodHunger;
	this.highestRow   = highestRow;
}

var AGENTS = {
	NONE:       new Agent('none',        0, 0,  0, 0,  0),
	GRASS:      new Agent('grass',       7, 0,  0, 0,  N_ROWS-3),
	YELLOWFISH: new Agent('yellowfish', 40, 20, 2, 60, 0),
	REDFISH:    new Agent('redfish',    40, 10, 1, 30,  0)
};

var Cells;
var YellowFishes;
var RedFishes;
var Grass;
var PickedAgent = AGENTS.REDFISH;

var Interval;
var IsPlaying = false;

onload = function() {
	reset();
}

function createCells() {
	Cells = [];
	var environ = document.getElementById("environ");
	while (environ.firstChild) {
    	environ.removeChild(environ.firstChild);
	}
	for (var row = 0; row < N_ROWS; row++) {
		Cells[row] = [];
		for (var col = 0; col < N_COLS; col++) {
			var cell = document.createElement("div");
			cell.id = getCellId(row, col);
			cell.className += " cell";
			cell.style.left = col * WIDTH + "px";
			cell.style.top  = row * WIDTH + "px";
			cell.onclick = clickCell;
			document.getElementById("environ").appendChild(cell);
			Cells[row][col] = AGENTS.NONE;
		}
	}
}

function placeAgents() {
	for (var row = 0; row < N_ROWS; row++) {
		for (var col = 0; col < N_COLS; col++) {
			if (Cells[row][col] == AGENTS.NONE) {
				for (i in AGENTS) {
					if (Cells[row][col] == AGENTS.NONE &&
							row >= AGENTS[i].highestRow &&
							Math.floor(Math.random() *
									AGENTS[i].makeChance)==0) {
						document.getElementById(getCellId(row,
								col)).className =
								"cell " + AGENTS[i].cssClass;

						Cells[row][col] = AGENTS[i];

						if (AGENTS[i] == AGENTS.GRASS) {
							Grass.push({
								row:row,
								col:col
							});
						} else if (AGENTS[i] == AGENTS.YELLOWFISH) {
							YellowFishes.push({
								row:row,
								col:col,
								hunger:0
							});
						} else if (AGENTS[i] == AGENTS.REDFISH) {
							RedFishes.push({
								row:row,
								col:col,
								hunger:0
							});
						}
					}
				}
			}
		}
	}
}

function getCellId(row, col) {
	return "cell" + row + "," + col;
}

function simulate() {
	checkHungry();
	tryEat();
	tryReproduce();
	moveRandom();
}

function checkHungry() {
	var i = YellowFishes.length;
	while (i--) {
		if (YellowFishes[i].hunger >= 100) {
			document.getElementById(getCellId(YellowFishes[i].row,
					YellowFishes[i].col)).className =
					"cell";
			Cells[YellowFishes[i].row][YellowFishes[i].col] =
					AGENTS.NONE;
			YellowFishes.splice(i,1);
		}
	}
	var i = RedFishes.length;
	while (i--) {
		if (RedFishes[i].hunger >= 100) {
			document.getElementById(getCellId(RedFishes[i].row,
					RedFishes[i].col)).className =
					"cell";
			Cells[RedFishes[i].row][RedFishes[i].col] =
					AGENTS.NONE;
			RedFishes.splice(i,1);
		}
	}
}

function tryEat() {
	for (var i = 0; i < YellowFishes.length; i++) {
		if (YellowFishes[i].col > 0) {
			for (var j = 0; j < Grass.length; j++) {
				if (Grass[j].row == YellowFishes[i].row &&
						Grass[j].col == YellowFishes[i].col-1 &&
						Math.floor(Math.random()*100) <
						AGENTS.YELLOWFISH.eatChance) {
					YellowFishes[i].hunger = 0;
				}
			}
		}
	}
	for (var i = 0; i < RedFishes.length; i++) {
		var j = YellowFishes.length;
		while (j--) {
			if (YellowFishes[j].row == RedFishes[i].row &&
					YellowFishes[j].col == RedFishes[i].col-1 &&
					Math.floor(Math.random()*100) <
					AGENTS.REDFISH.eatChance) {
				RedFishes[i].hunger = 0;
				document.getElementById(getCellId(YellowFishes[j].row,
						YellowFishes[j].col)).className = "cell";
				Cells[YellowFishes[j].row][YellowFishes[j].col] =
					AGENTS.NONE;
				YellowFishes.splice(j,1);
			}
		}
	}
}

function tryReproduce() {
	for (var i = 0; i < YellowFishes.length; i++) {
		YellowFishes[i].isNew = false;
	}
	for (var i = 0; i < YellowFishes.length; i++) {
		if (!YellowFishes[i].isNew &&
				YellowFishes[i].row < N_ROWS-1 &&
				Math.floor(Math.random()*100) <
				AGENTS.YELLOWFISH.reprodChance) {
			if (Cells[YellowFishes[i].row+1][YellowFishes[i].col] ==
					AGENTS.NONE) {
				YellowFishes.push({
					row:YellowFishes[i].row+1,
					col:YellowFishes[i].col,
					hunger:0,
					isNew:true
				});
				YellowFishes[i].hunger +=
						AGENTS.YELLOWFISH.reprodHunger;
				document.getElementById(
						getCellId(YellowFishes[i].row+1,
						YellowFishes[i].col)).className =
						"cell " + AGENTS.YELLOWFISH.cssClass;
				Cells[YellowFishes[i].row+1][YellowFishes[i].col] =
						AGENTS.YELLOWFISH;
			}
		}
	}

	for (var i = 0; i < RedFishes.length; i++) {
		RedFishes[i].isNew = false;
	}
	for (var i = 0; i < RedFishes.length; i++) {
		if (!RedFishes[i].isNew &&
				RedFishes[i].row < N_ROWS-1 &&
				Math.floor(Math.random()*100) <
				AGENTS.REDFISH.reprodChance) {
			if (Cells[RedFishes[i].row+1][RedFishes[i].col] ==
					AGENTS.NONE) {
				RedFishes.push({
					row:RedFishes[i].row+1,
					col:RedFishes[i].col,
					hunger:0,
					isNew:true
				});
				RedFishes[i].hunger += AGENTS.REDFISH.reprodHunger;
				document.getElementById(
						getCellId(RedFishes[i].row+1,
						RedFishes[i].col)).className =
						"cell " + AGENTS.REDFISH.cssClass;
				Cells[RedFishes[i].row+1][RedFishes[i].col] =
						AGENTS.REDFISH;
			}
		}
	}
}

function moveRandom() {
	for (var i = 0; i < YellowFishes.length; i++) {
		var emptyCells = [];
		var row = YellowFishes[i].row;
		var col = YellowFishes[i].col;
		// up
		if (row > 0 && Cells[row-1][col] == AGENTS.NONE) {
			emptyCells.push({row:row-1, col:col});
		}
		// left
		if (col > 0 && Cells[row][col-1] == AGENTS.NONE) {
			emptyCells.push({row:row, col:col-1});
		}
		// down
		if (row < N_ROWS-1 && Cells[row+1][col] == AGENTS.NONE) {
			emptyCells.push({row:row+1, col:col});
		}
		// right
		if (col < N_COLS-1 && Cells[row][col+1] == AGENTS.NONE) {
			emptyCells.push({row:row, col:col+1});
		}
		if (emptyCells.length > 0) {
			var moveCell = emptyCells[Math.floor(Math.random() *
					emptyCells.length)];
			Cells[moveCell.row][moveCell.col] = AGENTS.YELLOWFISH;
			Cells[row][col] = AGENTS.NONE;
			document.getElementById(getCellId(moveCell.row,
					moveCell.col)).className = "cell " +
					AGENTS.YELLOWFISH.cssClass;
			document.getElementById(getCellId(row, col)).className =
					"cell";
			YellowFishes[i].row = moveCell.row;
			YellowFishes[i].col = moveCell.col;
		}

		YellowFishes[i].hunger+=2;
	}
	for (var i = 0; i < RedFishes.length; i++) {
		var emptyCells = [];
		var row = RedFishes[i].row;
		var col = RedFishes[i].col;
		// up
		if (row > 0 && Cells[row-1][col] == AGENTS.NONE) {
			emptyCells.push({row:row-1, col:col});
		}
		// left
		if (col > 0 && Cells[row][col-1] == AGENTS.NONE) {
			emptyCells.push({row:row, col:col-1});
		}
		// down
		if (row < N_ROWS-1 && Cells[row+1][col] == AGENTS.NONE) {
			emptyCells.push({row:row+1, col:col});
		}
		// right
		if (col < N_COLS-1 && Cells[row][col+1] == AGENTS.NONE) {
			emptyCells.push({row:row, col:col+1});
		}
		if (emptyCells.length > 0) {
			var moveCell = emptyCells[Math.floor(Math.random() *
					emptyCells.length)];
			Cells[moveCell.row][moveCell.col] = AGENTS.REDFISH;
			Cells[row][col] = AGENTS.NONE;
			document.getElementById(getCellId(moveCell.row,
					moveCell.col)).className = "cell " +
					AGENTS.REDFISH.cssClass;
			document.getElementById(getCellId(row, col)).className =
					"cell";
			RedFishes[i].row = moveCell.row;
			RedFishes[i].col = moveCell.col;
		}

		RedFishes[i].hunger+=2;
	}
}

function play() {
	Interval = setInterval("simulate();", INTERVAL_SIZE);
	document.getElementById("playPause").innerHTML = "PAUSE";
	document.getElementById("playPause").onclick = pause;
	document.getElementById("step").disabled = true;
}

function pause() {
	clearInterval(Interval);
	document.getElementById("playPause").innerHTML = "PLAY";
	document.getElementById("playPause").onclick = play;
	document.getElementById("step").disabled = false;
}

function setup() {
	reset();
}

function reset() {
	Cells = [];
	YellowFishes = [];
	RedFishes = [];
	Grass = [];

	createCells();
	placeAgents();
}

function step() {
	simulate();
}

function clickCell() {
	var cell = getCellFromId(this.id);
	var row = cell.row;
	var col = cell.col;

	if (PickedAgent == AGENTS.YELLOWFISH &&
			Cells[row][col] == AGENTS.NONE) {

		document.getElementById(getCellId(row, col)).className =
				"cell " + AGENTS.YELLOWFISH.cssClass;

		Cells[row][col] = AGENTS.YELLOWFISH;

		YellowFishes.push({
			row:row,
			col:col,
			hunger:0
		});
	} else if (PickedAgent == AGENTS.REDFISH &&
			Cells[row][col] == AGENTS.NONE) {

		document.getElementById(getCellId(row, col)).className =
				"cell " + AGENTS.REDFISH.cssClass;

		Cells[row][col] = AGENTS.REDFISH;

		RedFishes.push({
			row:row,
			col:col,
			hunger:0
		});
	} else if (PickedAgent == AGENTS.NONE &&
			Cells[row][col] != AGENTS.GRASS) {
		var i = YellowFishes.length;
		while (i--) {
			if (row == YellowFishes[i].row &&
					col == YellowFishes[i].col) {
				YellowFishes.splice(i,1);
			}
		}
		var i = RedFishes.length;
		while (i--) {
			if (row == RedFishes[i].row &&
					col == RedFishes[i].col) {
				Cells[RedFishes[i].row][RedFishes[i].col] =
						AGENTS.NONE;
				RedFishes.splice(i,1);
			}
		}
		document.getElementById(getCellId(row, col)).className =
				"cell";
		Cells[row][col] = AGENTS.NONE;
	}
}

function getCellFromId(id) {
	id = id.replace("cell", "");
	var rowCol = id.split(",");
	return {row:parseInt(rowCol[0]), col:parseInt(rowCol[1])};
}

function pickRedFish() {
	document.getElementById("redFishPicker").className =
			"cell redfish picked";
	document.getElementById("yellowFishPicker").className =
			"cell yellowfish";
	document.getElementById("eraser").className =
			"cell";
	PickedAgent = AGENTS.REDFISH;
}

function pickYellowFish() {
	document.getElementById("redFishPicker").className =
			"cell redfish";
	document.getElementById("yellowFishPicker").className =
			"cell yellowfish picked";
	document.getElementById("eraser").className =
			"cell";
	PickedAgent = AGENTS.YELLOWFISH;
}

function erase() {
	document.getElementById("redFishPicker").className =
			"cell redfish";
	document.getElementById("yellowFishPicker").className =
			"cell yellowfish";
	document.getElementById("eraser").className =
			"cell picked";
	PickedAgent = AGENTS.NONE;
}