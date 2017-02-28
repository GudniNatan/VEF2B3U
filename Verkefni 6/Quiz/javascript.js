function Question(text, type, answer, options=undefined) {	//Smiður fyrir spurninga-object
	this.text = text;
	this.type = type;
	this.answer = answer;
	this.options = options
}
(function () {
	var questionBox = document.getElementById("question");	//Sæki spurninga p
	var answerInput = document.getElementById("answers");	//Sæki answers input
	var d = new Date();
	var questions = [new Question("What is 5 + 5?", "number", 10),	//Set allar spurningar í eitt array
	     new Question("What year is it?", "number", d.getFullYear()),
	     new Question("What is the meaning of life?", "number", 42),
	     new Question("Who made this program?", "text", "Guðni"),
	     new Question("What programming language was this made in?", "radio", "JavaScript", ["Python", "C++", "JavaScript", "Go"]),
	     new Question("What is the correct option?", "radio", "This one", ["Nope", "Not me", "This one", "The one above me"])]
	
	var questionNumber = 0;	//Stilltu þetta til að sjá mismunandi spurningar!!!
	
	questionBox.innerHTML = questions[questionNumber].text;	//Breyti textanum í þann sem vantar fyrir spurninguna
	answerInput.type = questions[questionNumber].type;	//Stilli type-ið af input
	
	if (answerInput.type == "radio")	//Þegar það kemur upp krossaspurning þarf að breyta aðeins til í dom-inu
	{
		var form = document.createElement("form");	//Bý til nýtt form til að fylla með radiobutton
		
		form.id = "answerForm"

		for (var i = 0; i < questions[questionNumber].options.length; i++) {	//Ljótt, ég veit, en þetta virkar
			var label = document.createElement("label");
			var radiobutton = document.createElement("input");
  			var text = document.createTextNode(questions[questionNumber].options[i]);

			radiobutton.type = "radio"
			radiobutton.name = "option"
  			radiobutton.value = questions[questionNumber].options[i];

  			label.appendChild(radiobutton);
  			label.appendChild(text);
  			form.appendChild(label);
		}
		document.body.insertBefore(form, answerInput);
		document.body.removeChild(answerInput);
	}
	else	//Þetta mundi breyta öllu til baka
	{
		var answerForm = document.getElementById("answerForm");
		if (answerForm)
		{
			document.body.insertBefore(answerInput, answerForm);
			document.body.removeChild(answerForm);
		}
	}
})();
