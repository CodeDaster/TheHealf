
var colors =  [];
var pickedColor;
var numSquares = 6;
var TryNoEasy = 0;
var TryNoMedium = 0;
var TryNoHard = 0;
var gameOn = 1;
var squares = document.querySelectorAll(".square")
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h2 = document.querySelector("h2");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();
function init(){
	setupModeButtons();
	setupSquares();
	setupGamesCount("Easy");
	setupGamesCount("Medium");
	setupGamesCount("Hard");
	reset();				// initial reset
}

function setupGamesCount(event){
	var gamesWon = localStorage.getItem("gamesWon")
	if( gamesWon === null || gamesWon === undefined ||gamesWon === "NaN"){
		localStorage.setItem("gamesWon", 0);
	}
	document.getElementById("gamesWon").innerHTML = localStorage.gamesWon;
	if( localStorage.getItem("avgTry" + event) == null){
		switch (event) {
		case "Easy":
			localStorage.setItem("avgTry" + event, 3);
			break;
		case "Medium":
			localStorage.setItem("avgTry" + event, 5);
			break;
		case "Hard":
			localStorage.setItem("avgTry" + event, 8);
		}
	
	}
	switch (event) {
    case "Easy":
		document.getElementById("avgTry" + event).innerHTML = Math.round(localStorage.avgTryEasy*100)/100;
        break;
    case "Medium":
		document.getElementById("avgTry" + event).innerHTML = Math.round(localStorage.avgTryMedium*100)/100;
        break;
    case "Hard":
		document.getElementById("avgTry" + event).innerHTML = Math.round(localStorage.avgTryHard*100)/100;
	}
}

function setupModeButtons(){
	// add click Eventlisteners to modeButton 
	for(var i=0; i< modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "EASY" ? numSquares = 3 : this.textContent === "MEDIUM" ? numSquares = 6 :numSquares = 9;
		reset();
	});
	}
}

function setupSquares(){
	// add click Eventlisteners to squares
	for(var i = 0 ; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			if(gameOn == 1){
				if( clickedColor.includes(pickedColor)){
					messageDisplay.textContent = "Correct!";
					changeColors(clickedColor);
					h2.style.background = clickedColor;
					adjustPoints(document.getElementsByClassName("selected")[0].innerHTML);
					resetButton.textContent = "Play Again?";
				}else{
					this.style.background = "#232323";
					messageDisplay.textContent = "Almost...";
					TryNoEasy = TryNoEasy + 1;
					TryNoMedium = TryNoMedium + 1;
					TryNoHard = TryNoHard + 1;
				}
			}
		});
	}
}

function adjustPoints(event){
	switch (event) {
		case "EASY":
			TryNoEasy = TryNoEasy + 1;
			localStorage.avgTryEasy = (Number(localStorage.avgTryEasy) * 5 + TryNoEasy)/ 6;
			document.getElementById("avgTryEasy").innerHTML = Math.round(localStorage.avgTryEasy*100)/100;
			TryNoEasy = 0; 
			break;
		case "MEDIUM":
			TryNoMedium = TryNoMedium + 1;
			localStorage.avgTryMedium = (Number(localStorage.avgTryMedium) * 5 + TryNoMedium)/ 6;
			document.getElementById("avgTryMedium").innerHTML = Math.round(localStorage.avgTryMedium*100)/100;
			TryNoMedium = 0; 
			break;
		case "HARD":
			TryNoHard = TryNoHard + 1;
			localStorage.avgTryHard = (Number(localStorage.avgTryHard) * 5 + TryNoHard)/ 6;
			document.getElementById("avgTryHard").innerHTML = Math.round(localStorage.avgTryHard*100)/100;
			TryNoHard = 0; 
		}
	localStorage.gamesWon = Number(localStorage.gamesWon) + 1;	
	document.getElementById("gamesWon").innerHTML = localStorage.gamesWon;
	gameOn = 0;
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h2.style.background = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	gameOn = 1;
	TryNoEasy = 0; 
	TryNoMedium = 0; 
	TryNoHard = 0; 
	for(var i=0; i< squares.length; i++){
		squares[i].style.background = colors[i];	
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
}

function changeColors(color){
	for(var i=0;i< colors.length; i++){
		squares[i].style.background = color;
	}	
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i< num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
	
resetButton.addEventListener("click", function(){
	reset();
});
