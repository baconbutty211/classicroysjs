async function GetAuthors() {
	const response = await fetch('https://JalAPI.jakeleiser.repl.co/classicroys/getauthors', {
		method: "GET"
	});
	let authors = await response.json();
	return authors;
}
async function SetAuthors() {
	let authorInput = document.getElementById("authorTextbox");
	const response = await fetch(`https://JalAPI.jakeleiser.repl.co/classicroys/setauthors?author=${authorInput.value}`, {
		method: "POST"
	});
	let newAuthors = await response.json();
	DisplayAuthors(newAuthors);
	
}

function addAuthorToDOM(parent, author) {
	let liElem = document.createElement("li");
	let aElem = document.createElement("a");
	aElem.innerHTML = `${author}`;
	aElem.href = `/Author.html?author=${author}`;
	liElem.appendChild(aElem);
	parent.appendChild(liElem);
}

function DisplayAuthors(authors) {
	let ulElem = document.getElementById("authorLst");
	ulElem.innerHTML = "";
	for (let i in authors) {
		addAuthorToDOM(ulElem, authors[i]);
	}
}

document.getElementById("setAuthorBtn").onclick = SetAuthors;
let authors = GetAuthors().then((authors) => {
	DisplayAuthors(authors);
});
