// AUTHOR: Aaron Weeden, Shodor Education Foundation, Jan/2014
// MODIFIER: Miguel de los Reyes, Shodor Education Foundation, Feb/2014

// Constants
var DEFAULT_ROW_COUNT = 20;
var DEFAULT_COLUMN_COUNT = 20;
var MAX_ROW_COUNT = 20;
var MAX_COLUMN_COUNT = 20;
var CELL_LENGTH = 25;
var DIRECTIONS = ["north", "south", "east", "west"];
var IMGS = {}; // Maps directions to HTML5 <img>s.
var COLORS = [ // Maps pheromone levels to colors.
	"white",   // 0 uses this color.
	"#FFBBBB",
	"#FFAAAA",
	"#FF9999",
	"#FF8888",
	"#FF7777",
	"#FF6666",
	"#FF5555",
	"#FF4444",
	"#FF3333",
	"#FF0000" // >= 10 uses this color.
];
var BLOCKED_COLOR = "#CCCCCC";
var TASKS = ["turn", "walk", "updatePheromones"];

// Input parameters
var RowCount = 0;
var ColumnCount = 0;
var AntCount = 0;

// Constructors for custom objects
function Ant(row, column, direction) {
	this.row = row;
	this.column = column;
	this.newRow = row;
	this.newColumn = column;
	this.oldRow = row;
	this.oldColumn = column;
	this.direction = direction;
}
function Cell(pheromoneLevel, antDirection, numberOfAnts, block) {
	this.pheromoneLevel = pheromoneLevel;
	this.antDirection = antDirection;
	this.wasEmpty = (antDirection == "none");
	this.numberOfAnts = numberOfAnts;
	this.block = block;
}

// Internal variables
var Cells;           // 2D array of cell objects
var Ants;            // 1D array of ant objects
var Canvas;          // HTML5 Canvas
var CanvasContext;   // Drawing context of the HTML5 Canvas
var CurrentTask;     // Always doing one of the TASKS (see var above)
var Interval;        // The time interval object
var AntsCanRetreat;  // True if ants can go back to the last cell they were in
var DisplayOption; // What will be displayed in cell corner

// Main function (called when page loads)
onload = function () {
	IMGS["none"] = null;
	IMGS["north"] = document.getElementById("northAnt");
	IMGS["south"] = document.getElementById("southAnt");
	IMGS["east"]  = document.getElementById("eastAnt");
	IMGS["west"]  = document.getElementById("westAnt");
	reset();
	retreat();
}

// Called when the start or resume buttons are clicked
function start() {
	Interval = setInterval("simulate();",
		parseInt(document.getElementById("msInput").value));

	document.getElementById("startButton").disabled = true;
	document.getElementById("pauseButton").disabled = false;
	document.getElementById("resumeButton").disabled = true;
	document.getElementById("resetButton").disabled = false;
	document.getElementById("rowSelect").disabled = true;
	document.getElementById("colSelect").disabled = true;
	document.getElementById("antSelect").disabled = true;
	document.getElementById("msInput").disabled = true;
	document.getElementById("retreat").disabled = true;
	document.getElementById("displayOption").disabled = true;
}

// Called when the pause button is clicked
function pause() {
	clearInterval(Interval);

	document.getElementById("startButton").disabled = true;
	document.getElementById("pauseButton").disabled = true;
	document.getElementById("resumeButton").disabled = false;
	document.getElementById("resetButton").disabled = false;
	document.getElementById("rowSelect").disabled = true;
	document.getElementById("colSelect").disabled = true;
	document.getElementById("antSelect").disabled = true;
	document.getElementById("msInput").disabled = false;
	document.getElementById("retreat").disabled = false;
	document.getElementById("displayOption").disabled = false;
}

// Called from onload and when reset button is clicked
function reset() {
	initInput();
	initInternalVars();
	placeInitBlock();
	placeAnts();
	draw();

	clearInterval(Interval);

	document.getElementById("startButton").disabled = false;
	document.getElementById("pauseButton").disabled = true;
	document.getElementById("resumeButton").disabled = true;
	document.getElementById("resetButton").disabled = false;
	document.getElementById("rowSelect").disabled = false;
	document.getElementById("colSelect").disabled = false;
	document.getElementById("antSelect").disabled = false;
	document.getElementById("msInput").disabled = false;
	document.getElementById("retreat").disabled = false;
	document.getElementById("displayOption").disabled = false;
}

// Called when the retreat checkbox is checked or unchecked
function retreat() {
	AntsCanRetreat = document.getElementById("retreat").checked;
}

function displayOption() {
	var myindex  = document.getElementById("displayOption").selectedIndex;
    var SelValue = document.getElementById("displayOption").options[myindex].value;
    DisplayOption = SelValue;
}

// Initialize input parameters
function initInput() {
	var rowSelect = document.getElementById("rowSelect");
	if (RowCount <= 0) {
		for (var i = 1; i <= MAX_ROW_COUNT; i++) {
			var opt = document.createElement("option");
			opt.text = i;
			rowSelect.add(opt);
		}

		RowCount = DEFAULT_ROW_COUNT;
		rowSelect.selectedIndex = RowCount - 1;
	} else {
		RowCount = rowSelect.selectedIndex + 1;
	}

	var colSelect = document.getElementById("colSelect");
	if (ColumnCount <= 0) {
		ColumnCount = DEFAULT_COLUMN_COUNT;
		for (var i = 1; i <= MAX_COLUMN_COUNT; i++) {
			var opt = document.createElement("option");
			opt.text = i;
			colSelect.add(opt);
		}

		ColumnCount = DEFAULT_COLUMN_COUNT;
		colSelect.selectedIndex = ColumnCount - 1;
	} else {
		ColumnCount = colSelect.selectedIndex + 1;
	}

	var antSelect = document.getElementById("antSelect");
	var selectedIndex = antSelect.selectedIndex;
	antSelect.options.length = 0;
	for (var i = 1; i <= RowCount * ColumnCount; i++) {
		var opt = document.createElement("option");
		opt.text = i;
		antSelect.add(opt);
	}
	if (AntCount <= 0 || AntCount > RowCount * ColumnCount) {
		AntCount = Math.ceil(RowCount * ColumnCount * 0.25);
		antSelect.selectedIndex = AntCount - 1;
	} else {
		antSelect.selectedIndex = selectedIndex;
		AntCount = selectedIndex + 1;
	}
	
	DisplayOption = "Pheromone Level";
}

// Initialize internal variables
function initInternalVars() {
	Cells = new Array(RowCount);
	for (var row = 0; row < RowCount; row++) {
		Cells[row] = new Array(ColumnCount);
		for (var col = 0; col < ColumnCount; col++) {
			Cells[row][col] = new Cell(0, "none", 0, false);
		}
	}

	Ants = new Array(AntCount);
	for (var i = 0; i < AntCount; i++) {
		Ants[i] = new Ant(-1, -1, "none");
	}

	Canvas = document.getElementById("canvas");

	Canvas.width = ColumnCount * CELL_LENGTH;
	Canvas.height = RowCount * CELL_LENGTH;

	CanvasContext = Canvas.getContext("2d");

	CurrentTask = 0;
}

function countAnts(row, col){
	var total = 0;
	for (var i = 0; i < AntCount; i++){
		if(AntCount[i].row == row && AntCount.col == col){
			total++;
		}
	}
	return total;
}

function placeAnts() {
	for (var i = 0; i < AntCount; i++) {
		var row;
		var col;

 		do {
			row = random(RowCount);
			col = random(ColumnCount);
 		} while (Cells[row][col].block);

		Ants[i].row = row;
		Ants[i].column = col;
		
		Cells[Ants[i].row][Ants[i].column].numberOfAnts++;
		Cells[row][col].antDirection = Ants[i].direction = DIRECTIONS[random(4)];
		Cells[row][col].wasEmpty = false;
	}
}

// Generate a random whole number between 0 and max. 0 is allowed; max is not allowed.
function random(max) {
	return Math.floor(Math.random() * max);
}

// Place the initial pheromone trail
function placeInitTrail() {
	var row = random(RowCount);
	var col = random(ColumnCount);
	var direction = DIRECTIONS[random(4)];

	for (var i = 1; i < COLORS.length + 1; i++) {
		if (row >= 0 && row < RowCount && col >= 0 && col < ColumnCount) {
			Cells[row][col].pheromoneLevel = i;
		}
		switch(direction) {
		case "north":
			row--;
			break;
		case "south":
			row++;
			break;
		case "east":
			col++;
			break;
		case "west":
			col--;
			break;
		}		
	}
}

function placeInitBlock(){
	var row = random(RowCount);
	var col = random(ColumnCount);
	var direction = DIRECTIONS[random(4)];
	var lengthOfBlock = 10;
	
	for (var i = 1; i < lengthOfBlock; i++){
		if (row >= 0 && row < RowCount && col >= 0 && col < ColumnCount){
			Cells[row][col].block = true;
		}
		switch(direction) {
		case "north":
			row--;
			break;
		case "south":
			row++;
			break;
		case "east":
			col++;
			break;
		case "west":
			col--;
			break;
		}
	}
}

function draw() {
	CanvasContext.clearRect(0, 0, Canvas.width, Canvas.height);
	drawPheromones();
	drawAnts();
}

function drawPheromones() {
	for (var row = 0; row < RowCount; row++) {
		for (var col = 0; col < ColumnCount; col++) {
			if(Cells[row][col].block == false){
				CanvasContext.fillStyle = COLORS[Cells[row][col].pheromoneLevel < 10 ?
					Cells[row][col].pheromoneLevel : 10];
				CanvasContext.fillRect(col * CELL_LENGTH, row * CELL_LENGTH,
					CELL_LENGTH, CELL_LENGTH);
			} else {
				CanvasContext.fillStyle = BLOCKED_COLOR;
				CanvasContext.fillRect(col * CELL_LENGTH, row * CELL_LENGTH,
					CELL_LENGTH, CELL_LENGTH);
			}

			CanvasContext.fillStyle = "black";
			if(DisplayOption == "Pheromone Level"){
				CanvasContext.fillText(Cells[row][col].pheromoneLevel, col * CELL_LENGTH,
					(row + 1) * CELL_LENGTH);
			}else if(DisplayOption == "Number of Ants"){
				CanvasContext.fillText(Cells[row][col].numberOfAnts, col * CELL_LENGTH,
					(row + 1) * CELL_LENGTH);
			}
		}
	}
}

function drawAnts() {
	for (var i = 0; i < AntCount; i++) {
		CanvasContext.drawImage(IMGS[Ants[i].direction],
			Ants[i].column * CELL_LENGTH, Ants[i].row * CELL_LENGTH,
				CELL_LENGTH, CELL_LENGTH);
	}
}

function simulate() {
	switch (TASKS[CurrentTask]) {
	case "turn":
		turn();
		break;
	case "walk":
		walk();
		break;
	case "updatePheromones":
		updatePheromones();
		break;
	}

	draw();
	CurrentTask = (CurrentTask + 1) % TASKS.length;
}

function turn() {
	for (var i = 0; i < AntCount; i++) {
		var dirs = new Array();
		var most = 0;
		var pL;
		if (Ants[i].row > 0) {
			if ((AntsCanRetreat ||
					Ants[i].oldRow != Ants[i].row-1 ||
					Ants[i].oldColumn != Ants[i].column) &&
					!Cells[Ants[i].row-1][Ants[i].column].block) {
				pL = Cells[Ants[i].row-1][Ants[i].column].pheromoneLevel;
				if (pL > most) {
					most = pL;
					dirs.length = 0;
				}
				if (pL == most) {
					dirs.push("north");
				}
			}
		}
		if (Ants[i].row < RowCount - 1) {
			if ((AntsCanRetreat ||
					Ants[i].oldRow != Ants[i].row+1 ||
					Ants[i].oldColumn != Ants[i].column) &&
					!Cells[Ants[i].row+1][Ants[i].column].block) {
				pL = Cells[Ants[i].row+1][Ants[i].column].pheromoneLevel;
				if (pL > most) {
					most = pL;
					dirs.length = 0;
				}
				if (pL == most) {
					dirs.push("south");
				}
			}
		}
		if (Ants[i].column < ColumnCount - 1) {
			if ((AntsCanRetreat ||
					Ants[i].oldRow != Ants[i].row ||
					Ants[i].oldColumn != Ants[i].column+1) &&
					!Cells[Ants[i].row][Ants[i].column+1].block) {
				pL = Cells[Ants[i].row][Ants[i].column+1].pheromoneLevel;
				if (pL > most) {
					most = pL;
					dirs.length = 0;
				}
				if (pL == most) {
					dirs.push("east");
				}
			}
		}
		if (Ants[i].column > 0) {
			if ((AntsCanRetreat ||
					Ants[i].oldRow != Ants[i].row ||
					Ants[i].oldColumn != Ants[i].column-1) &&
					!Cells[Ants[i].row][Ants[i].column-1].block) {
				pL = Cells[Ants[i].row][Ants[i].column-1].pheromoneLevel;
				if (pL > most) {
					most = pL;
					dirs.length = 0;
				}
				if (pL == most) {
					dirs.push("west");
				}
			}
		}
		Cells[Ants[i].row][Ants[i].column].antDirection = Ants[i].direction =
			dirs.length == 0 ? Ants[i].direction : dirs[random(dirs.length)];
	}
}

function walk() {
	for (var i = 0; i < AntCount; i++) {
		Ants[i].newRow = Ants[i].row;
		Ants[i].newColumn = Ants[i].column;	
	}
	for (var i = 0; i < AntCount; i++) {
		switch (Ants[i].direction) {
		case "north":
			if (Ants[i].row > 0) {
				Ants[i].newRow = Ants[i].row-1;
			}
			break;
		case "south":
			if (Ants[i].row < RowCount-1) {
				Ants[i].newRow = Ants[i].row+1;
			}
			break;
		case "east":
			if (Ants[i].column < ColumnCount-1) {
				Ants[i].newColumn = Ants[i].column+1;
			}
			break;
		case "west":
			if (Ants[i].column > 0) {
				Ants[i].newColumn = Ants[i].column-1;
			}
			break;
		}
	}
	for (var i = 0; i < AntCount; i++) {
		if (Ants[i].row != Ants[i].newRow || Ants[i].column != Ants[i].newColumn) {
			Cells[Ants[i].row][Ants[i].column].antDirection = "none";
			Cells[Ants[i].newRow][Ants[i].newColumn].numberOfAnts++;
			Cells[Ants[i].row][Ants[i].column].pheromoneLevel++;
			Ants[i].oldRow = Ants[i].row;
			Ants[i].oldColumn = Ants[i].column;
			Ants[i].row = Ants[i].newRow;
			Ants[i].column = Ants[i].newColumn;
			Cells[Ants[i].oldRow][Ants[i].oldColumn].numberOfAnts--;
			Cells[Ants[i].row][Ants[i].column].antDirection = Ants[i].direction;
		}
	}
}

function updatePheromones() {
	for (var row = 0; row < RowCount; row++) {
		for (var column = 0; column < ColumnCount; column++) {
			if (Cells[row][column].wasEmpty &&
					Cells[row][column].antDirection == "none" &&
					Cells[row][column].pheromoneLevel > 0) {
				Cells[row][column].pheromoneLevel--;
			}
			Cells[row][column].wasEmpty = (Cells[row][column].antDirection == "none");
		}
	}
}
