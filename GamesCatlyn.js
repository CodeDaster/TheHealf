
var ws = new WebSocket('ws://' + "zockerlot.de:8000" + '/ws');

document.addEventListener("DOMContentLoaded", function () {
	window.setTimeout(startGame, 200);
})

function startGame(event) {
	document.getElementById("essen").addEventListener("click", essen);
	document.getElementById("spiel").addEventListener("click", spiel);
	document.getElementById("putzen").addEventListener("click", putzen);
	document.getElementById("ersteHilfe").addEventListener("click", leben);
	
	aktuell()
	almaBackground()

	//EventListener
	ws.addEventListener('message', function (e) {
		var msg = JSON.parse(e.data);

		var kot = msg.kot;
		document.getElementById("leben").innerHTML = (msg.leben / 100) + '%';
		document.getElementById("spielen").innerHTML = (msg.spiel / 100) + '%';
		document.getElementById("hunger").innerHTML = (msg.hunger / 100) + '%';
		
		canvasPieDiagram(msg);
		
		var LebenString = msg.leben.toString();
		var ZustandString;

		if (LebenString == "Tod") {
			ZustandString = "ist tod";
			document.getElementById("almaBild").setAttribute("src", "http://der-fallende-planet.dd-dns.de/bilderte/almat.png");
		} else {
			if (msg.hunger >= 3000) {
				ZustandString = "ist hungrig";
			} else {
				ZustandString = "ist zufrieden";
			}
		}

		if (kot == false) {
			document.getElementById("schmutzig").innerHTML = '100%';
			ZustandString = ZustandString + " und dreckig";
		} else {
			document.getElementById("schmutzig").innerHTML = '0%';
		}

		document.getElementById("zustand").innerHTML = ZustandString + ".";
		balkenUpdate()
	});
}

function almaBackground(event) {
	Heute = new Date();
	Stunde = Heute.getHours();
	Minute = Heute.getMinutes();
	Sekunde = Heute.getSeconds();
	var dayLightValue = 255 - Math.pow(Math.abs(Stunde - 12), 2.5);
	document.getElementById("almaBild").style.background = "rgb(" + dayLightValue + ", " + dayLightValue + ", " + dayLightValue + ")";
	document.querySelector(".game").style.background = "rgb(" + dayLightValue + ", " + dayLightValue + ", " + dayLightValue + ")";
	return dayLightValue;
}

function essen(event) {
	if (ws.readyState == 1) {
		ws.send(JSON.stringify({
				hunger: "1",
				username: "essen"
			}));
		document.getElementById("almaBild").setAttribute("src", "Pictures/Dankdirkatze_feeding.png");
	} else {
		window.setTimeout(essen, 200);
	}
}

function spiel(event) {
	if (ws.readyState == 1) {
		ws.send(JSON.stringify({
				spiel: "1"
			}));
		document.getElementById("almaBild").setAttribute("src", "Pictures/Dankdirkatze_playing.png");
	} else {
		window.setTimeout(spiel, 200);
	}
}

function putzen(event) {
	if (ws.readyState == 1) {
		ws.send(JSON.stringify({
				kot: true,
				username: "putzen"
			}));
		document.getElementById("almaBild").setAttribute("src", "Pictures/Dankdirkatze_cleaning.png");
	} else {
		window.setTimeout(putzen, 200);
	}
}

function leben(event) {
	if (ws.readyState == 1) {
		ws.send(JSON.stringify({
				leben: "1",
				username: "leben"
			}));
		document.getElementById("almaBild").setAttribute("src", "Pictures/Dankdirkatze.png");
	} else {
		window.setTimeout(leben, 200);
	}
}

function balkenUpdate(event) {
	balkenWidth = document.getElementsByClassName("balken")
	for (var i = 0; i < balkenWidth.length; i++) {
		w = balkenWidth[i].innerText
		balkenWidth[i].setAttribute("style", "width :" + w)
	}
}

function aktuell(event) {
	if (ws.readyState == 1) {
		ws.send(JSON.stringify({
				username: "test"
			}));
		window.setTimeout(aktuell, 5000);
	} else {
		window.setTimeout(aktuell, 200);
	}
}


function canvasPieDiagram(event){

	// Vorgaben: Datensätze - Zahlenwerte, Legendentexte und Farbwerte
    var daten=[event.hungerdata,event.kotdata,event.spieldata,event.lebendata];
    var texte=["Gefüttert","Gesäubert","Gespielt","Erste Hilfe"];
    var farben=["rgb(150,150,250)","rgb(150,250,150)","rgb(250,150,150)","rgb(250,250,150)"];

    // Initialisierungen
    var anzahl=daten.length;
    var summe=0;for(var i=0;i<anzahl;i++)summe+=daten[i];
    var start_winkel=0,end_winkel=0;

    // canvas-Objekt
    var canvas=document.getElementById("cv");

    if(canvas.getContext){
		var context=canvas.getContext("2d");
		var dayLightValue = almaBackground();					// This part resets the canvas to update the new values
		context.fillStyle = "rgb(" + dayLightValue + ", " + dayLightValue + ", " + dayLightValue + ")";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fill();
			
        // Kopfzeile
        if(context.font && context.fillText) // Opera und IE mit excanvas.js verarbeiten text-Methoden nicht (Fehler!)
        {
          context.fillStyle="#00C";
          context.font="20px sans-serif";
          context.fillText("Catlyn Statistiken",180,20);
        }

        // Daten aufbereiten
        for(var i=0;i<anzahl;i++){
		// Kreissegment
			start_winkel=end_winkel;
            end_winkel+=daten[i]/summe*2*Math.PI;
            context.beginPath();
            context.moveTo(200,200);
            context.arc(200,200,150,start_winkel,end_winkel,false); // Mittelpunkt: 200,200 und Radius: 150
            context.closePath();
            context.fillStyle=farben[i];
            context.fill();
            context.fillRect(400,75+i*25,50,15); 			// Legendenrechteck 

            // Legendenbeschriftung
            if(context.font && context.fillText){
              context.fillStyle="#000";
              context.font="12px sans-serif";
			  context.fillText(" " + daten[i],400, 87+i*25);
              context.fillText(texte[i],460,87+i*25);
			  context.fillText("Catlyn wurde geboren am:",400,200);
			  var dateBorn = event.born.replace(/T/, " um ").split('+')[0];		// change the date to a readable format
			 // var dateBornDays = event.born.split('T')[0];
			  context.fillText(dateBorn,400,220);
			  context.font="12px sans-serif";
		    }
        }
    }
}
