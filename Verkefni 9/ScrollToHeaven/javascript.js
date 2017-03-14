var distance = -1;
var distanceText = document.getElementById("distance");
var background = document.getElementById("background");

function Color(hexColor)
{
	this.red = parseInt(hexColor.slice(0, 2), 16);
	this.green = parseInt(hexColor.slice(2, 4), 16);
	this.blue = parseInt(hexColor.slice(4, 6), 16);
	this.hexColor = hexColor;
}

function RGBMix(colors, percentages) {
	var r = 0;
	var g = 0;
	var b = 0;
	for (var i = colors.length - 1; i >= 0; i--) {
		r += colors[i].red * percentages[i];
		g += colors[i].green * percentages[i];
		b += colors[i].blue * percentages[i];
	}

	color = "";
	if (Math.round(r).toString(16).length == 2)
	{
		color += Math.round(r).toString(16);
	}
	else{
		color += "0" + Math.round(r).toString(16);
	}
	if (Math.round(g).toString(16).length == 2)
	{
		color += Math.round(g).toString(16);
	}
	else{
		color += "0" + Math.round(g).toString(16);
	}
	if (Math.round(b).toString(16).length == 2)
	{
		color += Math.round(b).toString(16);
	}
	else{
		color += "0" + Math.round(b).toString(16);
	}
  	return new Color(color);  
}

function scroll(event){
	event.preventDefault();
	window.scrollTo(0, 1000);
	distance ++;
	distance = distance % 100000;
	colors = [new Color("50ff00"), new Color("000080"), new Color("000000"), new Color("FFFFFF")];
	if (distance <= 1000)
	{
		percentages = [(1000 - distance) / 1000, distance / 1000, 0, 0];
	}
	else if (distance <= 10000)
	{
		percentages = [ 0, (10000 - (distance - 1000)) / 10000, (distance - 1000) / 10000, 0];
	}
	else
	{
		percentages = [0, 0, (100000 - (distance - 10000)) / 100000, (distance - 10000) / 100000];
	}
	if (distance == 1000)
	{
		alert("1000 meters! You are awesome! \n\n You could refresh to start again... or you could try to reach the stars.");
	}
	console.log(percentages);
	backgroundColor = RGBMix(colors, percentages);
	distanceText.innerText = distance;
	background.style.backgroundColor = `#${backgroundColor.hexColor}`;
}

(function () {
	document.addEventListener('scroll', function(event){scroll(event)}, false);
	document.addEventListener('DOMContentLoaded', function(){window.scrollTo(0, 1000)}, false);
})();





















