
document.addEventListener("DOMContentLoaded", function () {
	startLanguageSelection();
})

function startLanguageSelection(){
	document.getElementById("selectGerman").addEventListener("click", changeToGerman);
	document.getElementById("selectEnglish").addEventListener("click", changeToEnglish);
	document.getElementById("selectItalian").addEventListener("click", changeToItalian);
}

function changeToGerman(event) {
	removeVisibilityOfAllLanguages();
	document.querySelector(".de").classList.add('lang');
	document.getElementById("selectedLanguage").innerHTML = "German<span class='caret'></span>";
}
	
function changeToEnglish(event) {
	removeVisibilityOfAllLanguages();
	document.querySelector(".en").classList.add('lang');
	document.getElementById("selectedLanguage").innerHTML = "English<span class='caret'></span>";;
}

function changeToItalian(event) {
	removeVisibilityOfAllLanguages();
	document.querySelector(".it").classList.add('lang');
	document.getElementById("selectedLanguage").innerHTML = "Italian<span class='caret'></span>";
}

function removeVisibilityOfAllLanguages(event) {
	document.querySelector(".de").classList.remove('lang');
	document.querySelector(".en").classList.remove('lang');
	document.querySelector(".it").classList.remove('lang');
}
	

