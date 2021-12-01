window.onload = function(){

	let enlaces = document.getElementsByTagName("p");
	let logos = document.querySelectorAll("img[src='images/logo.gif']");
	let textosMenu = document.querySelector("#menu").querySelectorAll(".title ");
	let columnaDerecha = document.querySelector(".floatRight.width25.lightBlueBg.horzPad");
	let h3ColumnaDerecha = columnaDerecha.querySelectorAll("h3");
	let favLinksLista = document.querySelectorAll(".submenu2");


	alert( "Cantidad de enlaces: " + enlaces.length );

	for (var i = 0; i < logos.length; i++) {
		logos[i].src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png";
		logos[i].style.width = "100px";
	}

	textosMenu[0].innerHTML = "AAAA";
	textosMenu[1].innerHTML = "BBBB";
	textosMenu[2].innerHTML = "CCCC";
	textosMenu[3].innerHTML = "DDDD";

	favLinksLista[favLinksLista.length-1].remove();
	h3ColumnaDerecha[h3ColumnaDerecha.length-1].remove();

}
