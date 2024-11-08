async function GetAuthors() {
	const response = await fetch('https://JalAPI.jakeleiser.repl.co/classicroys/getauthors', {
		method: "GET"
	});
	let authors = await response.json();
	return authors;
}
async function GetRandomQuote() {
	const response = await fetch('https://JalAPI.jakeleiser.repl.co/classicroys/getrandomquote', {
		method: "GET"
	});
	let randomQuote = await response.json();
	return randomQuote;
}

function SetAuthorLabelHidden(ishidden) {
	let hiddenAuthElem = document.getElementById("secretAuthorLab");
	hiddenAuthElem.hidden = ishidden;
}
function GuessAuthor(authorGuess) {
	SetAuthorLabelHidden(false);
	let pElem = document.getElementById("secretAuthorLab");
	let authorTruth = pElem.innerHTML 
	if (authorGuess ===  authorTruth) {
		let scoreElem = document.getElementById("scoreLab");
		let score = scoreElem.innerHTML;
		score = score.split(" ")[1];
		score = Number(score) + 1;
		scoreElem.innerHTML = `score: ${score}`;
	}
	else {
		//console.log("Try again.")
	}
	NewQuote()
}

function addAuthorToDOM(parent, author) {
	let liElem = document.createElement("li");
	let btnElem = document.createElement("button");
	btnElem.innerHTML = `${author}`;
	btnElem.onclick = () => { GuessAuthor(btnElem.textContent); };
	liElem.appendChild(btnElem);
	parent.appendChild(liElem);
}
function DisplayAuthors(authors) {
	let ulElem = document.getElementById("authorLst");
	ulElem.innerHTML = "";
	for (let i in authors) {
		addAuthorToDOM(ulElem, authors[i]);
	}
}
function DisplayQuote(quote) {
	let pElem = document.getElementById("secretQuoteLab");
	pElem.innerHTML = quote;
}
function DisplayHiddenAuthor(author) {
	let pElem = document.getElementById("secretAuthorLab");
	pElem.innerHTML = author;
}

function NewQuote(){
	GetRandomQuote().then((quote) => {
		DisplayQuote(quote["Quote"])
		SetAuthorLabelHidden(true);
		DisplayHiddenAuthor(quote["Author"])
	});
}

let authors = GetAuthors().then((authors) => {
	DisplayAuthors(authors);
});
NewQuote();

