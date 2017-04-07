(function(){
	let schedule = [];

	let search_box = document.getElementById("search");

	function searchEvent(){
		try {
		    let sched = searchSchedule(search_box.value);
  			placeSchedules(sched);
		}
		catch(err) {
		    console.log(err);
		}
  	}

	document.addEventListener("DOMContentLoaded", function(event) {
		search_box.addEventListener('input', searchEvent, false);
		document.getElementById("date").textContent = (new Date()).toDateString();

		let warning = document.getElementById("warning");
		warning.parentNode.removeChild(warning);
	});

	$( document ).ajaxStop(function() {
		console.log("All AJAX requests finished!");
		//Run main site code here
		schedule.sort();
		schedule.reverse();
		for (var i = schedule.length - 1; i >= 0; i--) {
			schedule[i][1].reverse();
		}
		placeSchedules(schedule);
	});

	$( document ).ajaxStart(function() {
		console.log("Started AJAX!");
	});

	$.ajax({
	  'url': 'http://apis.is/tv/',
	  'type': 'GET',
	  'dataType': 'json',
	  'success': function(response) {
	    for (let i = response.results.length - 1; i >= 0; i--) {
	    	getSchedules(response.results[i].endpoints);
	    }
	  }
	});

	function getSchedules(channels){
		for (let c in channels){
			if (c == "stod2gull"){
				continue; //Enga hugmynd af hverju, en stöð2gull algjörlega brýtur síðuna
			}
			$.ajax({
			  'url': 'http://apis.is' + channels[c],
			  'type': 'GET',
			  'dataType': 'json',
			  'success': function(response) {
			    console.log(response);
			    schedule.push([c, response.results]);
			  },
			  'error': function(jqXHR, textStatus, errorThrown){
			  	console.log(errorThrown);
			  }
			});
		}
	}
	function placeSchedules(schedule){
		console.log(schedule);
		let accordionMenu = document.createElement("div");
		accordionMenu.id = "accordion";
		let accordionContainer = document.getElementById("accordionContainer");
		while (accordionContainer.firstChild) {
	    	accordionContainer.removeChild(accordionContainer.firstChild);
		}

		accordionContainer.appendChild(accordionMenu);
		//let accordionMenu = document.getElementById("accordion");
		for (let i = schedule.length - 1; i >= 0; i--) {
			let headText = document.createElement("h3");
			let contDiv = document.createElement("div");
			let timeTable = document.createElement("table");
			let tableBody = document.createElement("tbody");

			timeTable.classList.add("pure-table");

			headText.textContent = schedule[i][0];
			let sch = schedule[i][1];
			for (let j = sch.length - 1; j >= 0; j--) {
				let row = document.createElement("tr");
				let time = document.createElement("td");
				let title = document.createElement("td");
				time.textContent = sch[j].startTime.slice(10, 16);
				title.textContent = sch[j].title;
				row.title = sch[j].description;
				row.appendChild(time);
				row.appendChild(title);
				tableBody.appendChild(row);
			}
			timeTable.appendChild(tableBody);
			contDiv.appendChild(timeTable);
			accordionMenu.appendChild(headText);
			accordionMenu.appendChild(contDiv);
		}
		$( "#accordion" ).accordion({heightStyle: "content", collapsible: true});
	}
	function searchSchedule(search_string){
		let search_results = [];
		for (let i = 0; i < schedule.length; i++) {
			let row = [];
			for (let j = 0; j < schedule[i][1].length; j++) {
				let title = schedule[i][1][j].title;
				let originalTitle = schedule[i][1][j].originalTitle;
				if (title.search(RegExp(search_string, 'i')) > -1) //Might break if user inputs illegal regex strings
				{
					/*console.log(schedule[i][1][j].title);
					console.log(title.search(RegExp(search_string, 'i')));*/
					row.push(schedule[i][1][j]);
				}
				else if (originalTitle.length > 0 && originalTitle.search(RegExp(search_string, 'i')) > -1)
				{
					row.push(schedule[i][1][j]);
				}
			}
			if (row.length > 0)
			{
				search_results.push([schedule[i][0], row]);
			}
		}
		console.log("Results!");
		console.log(search_results);
		search_results.sort();
		search_results.reverse();
		return search_results;
	}
}());