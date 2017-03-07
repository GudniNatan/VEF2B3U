function Question(text, type, answer, options=undefined) {	//Smiður fyrir spurninga-object
	this.text = text;
	this.type = type;
	this.answer = answer;
	this.options = options
}

function shuffleArray(array) {
	 let m = array.length, t, i;
	 // While there remain elements to shuffle…
	 while (m) {
		 // Pick a remaining element…
		 i = Math.floor(Math.random() * m--);
		 // And swap it with the current element.
		 t = array[m];
		 array[m] = array[i];
		 array[i] = t;
	 }
	 return array;
}

function clickInput(e) {
	var target = e.target;
	if (target.nodeName == "INPUT")
	{
		target.classList.toggle("selected");
	}
}

(function () {
	var questionBox = document.getElementById("question");	//Sæki spurninga p
	var form = document.getElementById("answerForm");
	var d = new Date();
	var questions = [new Question("What is 5 + 5?", "number", 10),	//Set allar spurningar í eitt array
	     new Question("What year is it?", "number", d.getFullYear()),
	     new Question("What is the meaning of life?", "number", 42),
	     new Question("Who made this program?", "text", "Guðni"),
	     new Question("What programming language was this made in?", "radio", "JavaScript", ["Python", "C++", "JavaScript", "Go"]),
	     new Question("What is the correct option?", "radio", "This one", ["Nope", "Not me", "This one", "The one above me"])]

	questions = shuffleArray(questions);
	
	var questionNumber = 0;	//Stilltu þetta til að sjá mismunandi spurningar!!!
	
	questionBox.innerHTML = questions[questionNumber].text;	//Breyti textanum í þann sem vantar fyrir spurninguna

	if (questions[questionNumber].type == "radio")	//Þegar það kemur upp krossaspurning þarf að breyta aðeins til í dom-inu
	{
		for (var i = 0; i < questions[questionNumber].options.length; i++) {	//Ljótt, ég veit, en þetta virkar
			var label = document.createElement("label");
			var radiobutton = document.createElement("input");
			var text = questions[questionNumber].options[i];

			radiobutton.type = "radio"
			radiobutton.name = "option"
  			radiobutton.value = text;
  			radiobutton.id = text;

  			label.innerText = text;
  			label.htmlFor = radiobutton.id;

  			form.appendChild(radiobutton);
  			form.appendChild(label);
		}
	}
	else
	{
		var input = document.createElement("input");

		input.type = questions[questionNumber].type;
		input.id = "answers";

		form.appendChild(input);
	}

	var el = document.getElementById('answerForm');
	el.addEventListener('click', function(){clickInput(event)}, false);
})();