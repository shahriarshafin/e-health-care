// function call
getCovidapi();
getdiseaseName();

// covid-19-api
async function getCovidapi() {
	const jsondata = await fetch("https://api.covid19api.com/summary");
	const jsdata = await jsondata.json();
	const Bangladesh = jsdata.Countries[13];
	console.log(jsdata);
	document.querySelector("#confirmed").innerHTML = Bangladesh.NewConfirmed;
	document.querySelector("#deaths").innerHTML = Bangladesh.NewDeaths;
	document.querySelector("#recovered").innerHTML = Bangladesh.NewRecovered;
}

// getdiseaseName
async function getdiseaseName() {
	const jsondatas = await fetch(
		"https://gist.githubusercontent.com/shahriarshafin/2d164de88020efb2268db7b06281d87c/raw/89d4186b920ea160481f22fb3d988943fa09ac4c/disease.json"
	);
	const diseases = await jsondatas.json();

	let input = document.querySelector("textarea[name=tags2]"),
		tagify = new Tagify(input, {
			enforceWhitelist: true,
			delimiters: null,
			whitelist: diseases,
			callbacks: {
				add: console.log, // callback when adding a tag
				remove: console.log, // callback when removing a tag
			},
		});
}
