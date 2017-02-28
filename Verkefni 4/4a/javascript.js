var pizza = {
	nafn: "Svepperoni",
	verd: 1999,
	staerd: "Large",
	alegg: ["pepperoni", "sveppir"]
};

document.getElementById("mainDiv").innerHTML = "<h2>Pizza object:</h2>";
for (property in pizza) {
	document.getElementById("mainDiv").innerHTML += ("<p>\t" + property + ": " + pizza[property] + "</p>");
}