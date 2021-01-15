//------folder of Pictures
var pfad = "Pictures/"
//------Amount of Pictures
var bilder = 7
//------Name of Pictures
var bild0 = "MyILD_Black"
var bild1 = "MyILD_Black_Inverse"
var bild2 = "MyILD_Black_Inverse_dark"
var bild3 = "Mystisch"
var bild4 = "seemslegite"
var bild5 = "Chinesische Note"
var bild6 = "map"
var bild7 = "xxxx"
var bild8 = "xxxx"
var bild9 = "xxxx"
var bild10 = "xxxx"
var bild11 = "xxxx"
var bild12 = "xxxx"
var bild13 = "xxxx"
var bild14 = "xxxx"
var bild15 = "xxxx"
var bild16 = "xxxx"
var bild17 = "xxxx"


function createBilder() {
	for (var i = 0; i < bilder; i++) {
	var bildPfad = pfad + eval("bild" + i)
	document.getElementById("galerie").innerHTML = document.getElementById("galerie").innerHTML + ("<img src='" + bildPfad + ".png'>");
	}
};
