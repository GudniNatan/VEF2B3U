function Pizza(nafn, verd, staerd, alegg){
	this.nafn = nafn;
	this.verd = verd;
	this.staerd = staerd;
	this.alegg = alegg;
}

var pizza1 = new Pizza("Margarita", 1699, "Large", []);
var pizza2 = new Pizza("Hawaiian", 2499, "Large", ["Ananas", "Skinka"]);
var pizza3 = new Pizza("Svepperoni", 1999, "Large", ["Pepperoni", "Sveppir"]);

var matsedill = [pizza1, pizza2, pizza3];

for (let i = 0; i < matsedill.length; i++) {
	document.getElementById("mainDiv").innerHTML += "<h2>pizza" + (i + 1) + " object:</h2>";
	for (property in matsedill[i]) {
		document.getElementById("mainDiv").innerHTML += ("<p>\t" + property + ": " + matsedill[i][property] + "</p>");
	}
}
