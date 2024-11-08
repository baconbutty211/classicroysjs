async function GetScript(){
	const response = await fetch(`https://JalAPI.jakeleiser.repl.co/classicroys/getscript`, {
		method: "GET"
	});
	return await response.json();
}

async function SetScript() {
	let scriptInput = document.getElementById("scriptInput");
	let line = scriptInput.value;
	console.log(line);
	const response = await fetch(`https://JalAPI.jakeleiser.repl.co/classicroys/setscript?line=${line}`, {
		method: "POST"
	});
	let newScript = await response.json();
	DisplayScript(newScript);
	scriptInput.innerHTML = "";
}

function DisplayScript(script) {
	let scriptLst = document.getElementById("scriptLst");
	scriptLst.innerHTML = "";
	for (let line in script) {
		let liElem = document.createElement("li");
		liElem.innerHTML = `${script[line]}`;
		scriptLst.appendChild(liElem);
	}
}

let submitBtn = document.getElementById('SubmitBtn');
submitBtn.onclick = SetScript;
GetScript().then((script) => {
	DisplayScript(script);
});
