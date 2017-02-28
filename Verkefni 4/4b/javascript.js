function Pizza(nafn, verd, staerd, alegg){
	this.nafn = nafn;
	this.verd = verd;
	this.staerd = staerd;
	this.alegg = alegg;
}

var pizza1 = new Pizza("Margarita", 1699, "Large", []);
var pizza2 = new Pizza("Hawaiian", 2499, "Large", ["Ananas", "Skinka"]);


document.getElementById("mainDiv").innerHTML = "<h2>pizza1 object:</h2>";
for (property in pizza1) {
	document.getElementById("mainDiv").innerHTML += ("<p>\t" + property + ": " + pizza1[property] + "</p>");
}
document.getElementById("mainDiv").innerHTML += "<h2>pizza2 object:</h2>";
for (property in pizza2) {
	document.getElementById("mainDiv").innerHTML += ("<p>\t" + property + ": " + pizza2[property] + "</p>");
}