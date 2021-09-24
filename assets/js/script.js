getdiseaseName();

async function getdiseaseName() {
	const jsondatas = await fetch("./assets/dataAPI.json");
	const getData = await jsondatas.json();

	const diseases = getData.diseases;
	const cities = getData.cities;
	const doctorSpe = getData.doctorSpe;
	const hospitals = getData.hospitals;

	autocomplete(document.getElementById("cityField"), cities);
	autocomplete(document.getElementById("cityField2"), cities);
	autocomplete(document.getElementById("doctorSpeField"), doctorSpe);
	autocomplete(document.getElementById("hospitalField"), hospitals);

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

function autocomplete(inp, arr) {
	var currentFocus;
	inp.addEventListener("input", function (e) {
		var a,
			b,
			i,
			val = this.value;
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		for (i = 0; i < arr.length; i++) {
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				b = document.createElement("DIV");
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				b.addEventListener("click", function (e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}
