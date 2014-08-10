var stocks;
var URL = 'http://shodor.org/~amalani/AjaxTutorial/stocks/stocks.php?symbols=';
var symbols = ['GOOG', 'FB', 'TWTR', 'WMT', 'AAPL', 'T', 'MCD'];


function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function changetickers() {
	symbols.push(document.getElementById('tickers').value);
	document.getElementById('tickers').value = "";
	url();
	update();
}

function url(array) {
	var arraystring = "";
	for (i = 0; i < symbols.length; i++) {
		arraystring += "+" + symbols[i] ;
	}
	return arraystring;
}	

function update() {
$.getJSON(URL+url(symbols), function(data) {
	stocks = data;
	
	for(var i=0; i<stocks.length; i++) {
		stocks[i].diff = (stocks[i].price - stocks[i].open);
		stocks[i].percent = ((stocks[i].diff / stocks[i].open)*100).toFixed(2);
		stocks[i].diff = (stocks[i].diff/100).toFixed(2);
		stocks[i].price = (stocks[i].price/100).toFixed(2);
		stocks[i].open = (stocks[i].open/100).toFixed(2);
	}
	var table = ""; 
	table += "<tr>";
	for (var property in stocks[0]) {
		var valueclass = '';
		if (stocks[0].hasOwnProperty(property)) {
			table += "<th class='"+property+"'>" + capitalize(property) + "</th>";
		}
	}
	table += "</tr>";
		
		
	for(var i=0; i<stocks.length; i++) {
		table += "<tr class='row'>";
		for (var property in stocks[i]) {
			valueclass = '';
			var percentsign = '';
			if(property==='percent'){
				percentsign = '%';
			}
			if(property==='diff'||property=='percent'){
				if(stocks[i][property]>0){
					valueclass+='positive';
				}else if(stocks[i][property]<0){
					valueclass+='negative';
				}
			}
			table += "<td class='"+valueclass+' '+property+"'>"+ stocks[i][property]+percentsign+"</td>";
		}
		table += "<td class='remove' id='"+i+"'>Remove</td>"
		table += "</tr>";
	}
	document.getElementById("stocktable").innerHTML = table;
	var d = new Date();
	document.getElementById("time").innerHTML = "Last Update: " + d.toLocaleString();
	$(".remove").each(function(){
		$(this).css("display", "none");
	});
	$("tr").each(function(){
		$(this).click(function(){
			$(this).children(".remove").toggle();
		});
	});
	$(".row").hover(
		function () {
			$(this).addClass("hovered");
		},
		function () {
			$(this).removeClass("hovered");
		}
	);
	var myClass;
	
	$("th").hover(
		function(){
			myClass = $(this).attr("class");
			$('#stocktable .'+myClass+'').each(function(){
				$(this).addClass('hovered');
			});
		},
		function(){
			myClass = $(this).attr("class").split(' ')[0];
			$('#stocktable .'+myClass+'').each(function(){
				$(this).removeClass('hovered');
			});
		}
	);
	
	$( ".remove" ).click(function() {
    	$(this).closest('tr').remove();
    	i = $(this).attr('id');
    	symbols.splice(i,1);
    	console.log(symbols);
	});
	
	
	
});
}

url();
update();
var interval = setInterval(update, 5000);