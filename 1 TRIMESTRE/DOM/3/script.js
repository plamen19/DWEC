window.onload = function(){

	// Seleccionamos los elementos

	let menu = document.getElementById( "menu" ).querySelector("ul").querySelectorAll("li");
	let menuSide = document.getElementById( "sidebar" ).querySelector("ul").querySelectorAll("li");
	let contenido = document.getElementById("content");

	// Cambiamos el texto del menú principal

	for (var i = 0; i < menu.length; i++) {

		let newA = document.createElement( "a" );

		newA.appendChild( document.createTextNode( i + "" + i + "" + i ) );

		menu[i].removeChild( menu[i].firstChild );
		menu[i].appendChild( newA );
	}

	for (var i = 0; i < menuSide.length; i++) {

		let newA = document.createElement( "a" );

		newA.appendChild( document.createTextNode( i + "" + i + "" + i ) );

		menuSide[i].removeChild( menuSide[i].firstChild );
		menuSide[i].appendChild( newA );
	}

	// Cambiamos el color de las letras del menú

	for (var i = 0; i < menu.length; i++) {
		let a_li = menu[i].getElementsByTagName("a");
		for (var j = 0; j < a_li.length; j++) {
			a_li[j].classList.add("colorNuevo");
		}
	}

	for (var i = 0; i < menuSide.length; i++) {
		let a_li = menuSide[i].getElementsByTagName("a");
		for (var j = 0; j < a_li.length; j++) {
			a_li[j].classList.add("colorNuevo");
		}
	}

	while( contenido.childNodes[0] ){
		contenido.removeChild( contenido.childNodes[0] );
	}

	for (var i = 0; i < 3; i++) {
		let parrafo = document.createElement("p");

		parrafo.appendChild( document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.") );

		contenido.appendChild(parrafo);
	}


}
