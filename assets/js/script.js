// covid-19-api
async function getCovidapi() {
	const jsondata = await fetch("https://api.covid19api.com/summary");
	const jsdata = await jsondata.json();
	const Bangladesh = jsdata.Countries[13];

	console.log(Bangladesh.NewConfirmed);
	document.querySelector("#confirmed").innerHTML = Bangladesh.NewConfirmed;
	document.querySelector("#deaths").innerHTML = Bangladesh.NewDeaths;
	document.querySelector("#recovered").innerHTML = Bangladesh.NewRecovered;
}
getCovidapi();
// covid-19-api

// taglist
// const huu = fetch("./test.json")
// 	.then((response) => response.json())
// 	.then((json) => {
// 		console.table(json);
// 		for (var x in json) {
// 			document.write(json[x]);
// 			let sexy = [json[x]];
// 			return sexy;
// 		}
// 	});

// ..........

// const myJSON = '["Ford", "BMW", "Fiat"]';
// const diseases = JSON.parse(myJSON);

// .................................................
const diseases = [
	"Allergies",
	"Colds and Flu",
	"Conjunctivitis",
	"Diarrhea",
	"Headaches",
	"Mononucleosis",
	"Stomach Aches",
	"irritation",
	"Runny nose",
	"Stuffy nose",
	"Puffy",
	"Sneezing",
	"Inflamed",
	"sneezing,",
	"sore throat",
	"cough",
];
var input = document.querySelector("input[name=tags-manual-suggestions]"),
	// init Tagify script on the above inputs
	tagify = new Tagify(input, {
		whitelist: diseases,
		dropdown: {
			position: "manual",
			maxItems: Infinity,
			enabled: 0,
			classname: "customSuggestionsList",
		},
		enforceWhitelist: true,
	});

tagify
	.on("dropdown:show", onSuggestionsListUpdate)
	.on("dropdown:hide", onSuggestionsListHide)
	.on("dropdown:scroll", onDropdownScroll);

renderSuggestionsList();

// ES2015 argument destructuring
function onSuggestionsListUpdate({ detail: suggestionsElm }) {
	console.log(suggestionsElm);
}

function onSuggestionsListHide() {
	console.log("hide dropdown");
}

function onDropdownScroll(e) {
	console.log(e.detail);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
function renderSuggestionsList() {
	tagify.dropdown.show(); // load the list
	tagify.DOM.scope.parentNode.appendChild(tagify.DOM.dropdown);
}
// taglist
