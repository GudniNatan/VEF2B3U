var form = document.getElementById("answerForm");

var questionNumber = 0;
var score = 0;

var d = new Date();
var questions = [new Question("What is 5 + 5?", "number", 10),	//Set allar spurningar í eitt array
	new Question("What year is it?", "number", d.getFullYear()),
	new Question("What is the meaning of life?", "number", 42),
	new Question("Who made this program?", "text", "Gudni"),
	new Question("What programming language was this made in?", "radio", "JavaScript", ["Python", "C++", "JavaScript", "Go"]),
	new Question("What is the correct option?", "radio", "This one", ["Nope", "Not me", "This one", "The one above me"])];


function Question(text, type, answer, options=undefined) {	//Smiður fyrir spurninga-object
	this.text = text;
	this.type = type;
	this.answer = answer;
	this.options = options;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

async function submit(event) {	//Function is async so I can retrigger the animation. If you are using firefox, you should update to the latest version or this will break.
	event.preventDefault();
	//Remove classes and wait for 25ms, so that the animation will be properly triggered
	form.classList.remove("correctAnswer", "wrongAnswer");
	await sleep(25);

	//Check answer
	if (String(form.elements["ans"].value).toLowerCase() == String(questions[questionNumber].answer).toLowerCase())
	{
		var scoreText = document.getElementById('score');
		scoreText.textContent = ++score;
		form.classList.add("correctAnswer");
	}
	else
	{
		form.classList.add("wrongAnswer");
	}

	//Set up next question or end the game if all questions have been answered
	if (questionNumber < questions.length - 1)
	{
		setQuestion(questions[++questionNumber]);
	}
	else{
		//Display score
		while (form.firstChild) {
	    form.removeChild(form.firstChild);
		}
		var button = document.getElementById('submit');
		var question = document.getElementById('question');
		var smallText = document.getElementById('smallText');
		button.parentNode.removeChild(button);
		question.parentNode.removeChild(question);
		smallText.parentNode.removeChild(smallText);
		var finalText = document.createElement("h3");
		finalText.textContent = `You got ${score} questions out of ${questions.length}, or ${(score / questions.length * 100).toFixed(2)}%.`;
		form.appendChild(finalText);
	}
}

function setQuestion(question){
	console.log(question);
	var questionBox = document.getElementById("question");	//Sæki spurninga p
	while (form.firstChild) {
	    form.removeChild(form.firstChild);
	}

	questionBox.innerHTML = question.text;	//Breyti textanum í þann sem vantar fyrir spurninguna

	if (question.type == "radio")	//Þegar það kemur upp krossaspurning þarf að breyta aðeins til í dom-inu
	{
		for (var i = 0; i < question.options.length; i++) {	//Lætur inn hvern valmöguleika einn í einu
			var label = document.createElement("label");
			var radiobutton = document.createElement("input");
			var text = question.options[i];

			radiobutton.type = "radio";
			radiobutton.name = "ans";
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

		input.type = question.type;
		input.id = "answers";
		input.name = "ans";

		form.appendChild(input);
	}


}

(function () {
	questions = shuffleArray(questions);

	setQuestion(questions[questionNumber]);

	var button = document.getElementById('submit');
	button.addEventListener('click', function(event){submit(event)}, false);
	form.addEventListener('submit', function(event){submit(event)}, false);
})();