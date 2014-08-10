var client = new XMLHttpRequest();
var paragraph;
var array;
var index = 0;
var timeout;
client.open('GET', 'reader.txt');
client.onreadystatechange = function() {
	paragraph = client.responseText;
	parseparagraph();
}


client.send();

function parseparagraph(){
	document.getElementById("word").innerHTML = paragraph;
	array = paragraph.split(" ");
}

function multiplier(word){
	var lastchar = word.slice(-1);
	if(lastchar === ','){
		return 1.5;
	}else if(endcharpresent = ";.?!".indexOf(lastchar) != -1){
		return 2;
	}else{
		return 1;
	}
}

function displayeach(go){
	go = typeof go !== 'undefined' ? go : true;
	if(index > array.length-2){
		stopdisplay();
	}
	document.getElementById("word").innerHTML = array[index];
	index++;
	
	if(go){
		timeout = setTimeout(displayeach, time*multiplier(array[index-1]));
	}
}

function restart(){
	index = 0;
	clearTimeout(timeout);
	displayeach(false);
}

function showparagraph(){
	document.getElementById("word").innerHTML = paragraph;
}

function startdisplay(){
	time = document.getElementById("speed").value;
	time=Math.round((60/time)*1000);
	timeout = setTimeout(displayeach, time);
	document.getElementById("startButton").disabled = true;
	document.getElementById("stopButton").disabled = false;
	document.getElementById("restartButton").disabled = true;
	document.getElementById("paragraphButton").disabled = true;
}

function stopdisplay(){
	clearTimeout(timeout);
	document.getElementById("startButton").disabled = false;
	document.getElementById("stopButton").disabled = true;
	document.getElementById("restartButton").disabled = false;
	document.getElementById("paragraphButton").disabled = false;
}


//File stuff
  function readBlob() {

    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file.');
      return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
      if (file.type.match('text/plain')) {
			paragraph = evt.target.result;
        	parseparagraph();
		} else {
			alert("File is not plaintext.");
		}
        
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }
  
function clearFile(){
	var control = document.getElementById("files");
	control.replaceWith( control = control.clone( true ) );
}