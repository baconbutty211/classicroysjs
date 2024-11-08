function DecodeUrl(url) {
	return url
}
function GetParams() {
	let queryString = window.location.search.substring(1);
	queryString = DecodeUrl(queryString);
	return queryString.split('&');
}
function GetParam(param) {
	let params = GetParams();
	for (let i in params) {
		if (params[i].split('=')[0] == param) {
			return params[i].split('=')[1];
		}
	}
}
function GetAuthor() {
	return GetParam("author");
}

async function GetQuotes() {
	const response = await fetch(`https://JalAPI.jakeleiser.repl.co/classicroys/getquotes?author=${authorName}`, {
		method: "GET"
	});
	let quotes = await response.json();
	return quotes;
}

async function SetQuotes() {
	let quoteInput = document.getElementById("quoteTextbox");
	const response = await fetch(`https://JalAPI.jakeleiser.repl.co/classicroys/setquotes?author=${authorName}&quote=${quoteInput.value}`, {
		method: "POST"
	});
	let newQuotes = await response.json();
	DisplayQuotes(newQuotes);
	quoteInput.value = "";
}

function addQuoteToDOM(parent, quote) {
	let liElem = document.createElement("li");
	liElem.innerHTML = `${quote}`;
	parent.appendChild(liElem);
}

function DisplayQuotes(quotes) {
	let ulElem = document.getElementById("quotesLst");
	ulElem.innerHTML = "";
	for (let i in quotes) {
		addQuoteToDOM(ulElem, quotes[i]);
	}
}

let authorName = GetAuthor();
let h1Elem = document.createElement('h1');
h1Elem.innerHTML = `Classic ${authorName}`;
document.body.insertBefore(h1Elem, document.body.firstChild);

let button = document.getElementById("setQuoteBtn");
button.onclick = SetQuotes;

let input = document.getElementById("quoteTextbox");
input.placeholder = `Enter a classic ${authorName}`;
input.addEventListener("keypress", function(event){
	if(event.key === "Enter") {
    event.preventDefault();
    // Trigger the button element with a click
    button.click();
	}
}); 

GetQuotes().then((quotes) => {
	console.log(quotes);
	DisplayQuotes(quotes);
});
