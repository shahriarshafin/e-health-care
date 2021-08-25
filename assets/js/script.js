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
