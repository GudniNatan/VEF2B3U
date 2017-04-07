(function(){
	moment().format();
	moment.locale("is");

	let container = document.getElementById("imagesGoHere");
	concerts = [];
	
	let select = document.getElementById("categories");
	select.addEventListener('change', searchEvent, false);
	categories = new Set();


	let search_box = document.getElementById("search");
	search_box.addEventListener('input', searchEvent, false);

	let years = document.getElementById("years");
	if (moment().year() > 2017)
	{
		years.textContent += " - " + moment().year();
	}

	$.ajax({
	  'url': 'http://apis.is/concerts/',
	  'type': 'GET',
	  'dataType': 'json',
	  'success': function(response) {
	    for (var i = response.results.length - 1; i >= 0; i--) {
	    	concerts.push(response.results[i])
	    }
	    concerts.sort(function(a, b) {
			var dateA = new Date(a.dateOfShow);
			var dateB = new Date(b.dateOfShow);
			return dateA - dateB;
		});
		for (var i = 0; i < concerts.length; i++) {
	    	addConcert(concerts[i], i);
	    }
		for (let item of categories){
			let option = document.createElement("option");
			option.value = item;
			option.textContent = item;
			select.appendChild(option);
		}
	  },
	  'error': function(response){
	  	let text = document.createElement("p");
	  	text.textContent = response;
	  	container.appendChild(text);
	  }
	});

	function addConcert(concert, id){
		//Add image to dom, push concert to array
		//pick an ID for each concert
		let div = document.createElement("div");
		let figure = document.createElement("figure");
		let image = document.createElement("img");
		let caption = document.createElement("figcaption");
		let nameP = document.createElement("p");
		let dateP = document.createElement("p");
		let locationP = document.createElement("p");

		let date = moment(concert.dateOfShow).format("LLL");

		div.id = `image${id}`;
		div.classList.add("imageContainer");

		image.src = concert.imageSource;
		image.alt = concert.name;
		figure.title = concert.name;


		nameP.textContent = concert.eventDateName;
		dateP.textContent = date;
		locationP.textContent = concert.eventHallName;

		caption.appendChild(nameP);
		caption.appendChild(dateP);
		caption.appendChild(locationP);

		figure.appendChild(image);
		figure.appendChild(caption);
		div.appendChild(figure);
		container.appendChild(div);

		concert.id = id;
		categories.add(concert.eventHallName);
	}

	function dateSort(concertA, concertB)
	{
		let dateA = new Date(concertA.dateOfShow);
		let dateB =new Date(concertB.dateOfShow);
		return dateA - dateB;
	}

	function searchEvent(){
		searchConcerts(search_box.value);
	}

	function searchConcerts(search_string){
		//Hide / show concerts according to the search.
		for (let i = 0; i < concerts.length; i++) {
			let selectedLocation = select.options[select.selectedIndex].value;
			let currentImage = document.getElementById(`image${concerts[i].id}`);
			let hidden = true;

			//Search by name, location, band, artists
			let eventDateName = concerts[i].eventDateName;
			let name = concerts[i].name;
			let userGroupName = concerts[i].userGroupName;
			let eventHallName = concerts[i].eventHallName;
			let possibleStrings = [eventDateName, name, userGroupName];
			for (var k = possibleStrings.length - 1; k >= 0; k--) {
				if (possibleStrings[k].length > 0 && possibleStrings[k].search(RegExp(search_string, 'i')) > -1 && (selectedLocation == eventHallName || selectedLocation == ""))
				{
					hidden = false;
					break;
				}
			}
			if (hidden)
			{
				currentImage.style.display = "none";
			}
			else
			{
				currentImage.style.display = "";
			}
		}
	}

	document.addEventListener("DOMContentLoaded", function(event) {
		let warning = document.getElementById("warning");
		warning.parentNode.removeChild(warning);
	});
}());