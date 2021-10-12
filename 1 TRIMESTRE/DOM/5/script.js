window.onload = function( ) {

	let contenido = document.getElementById( "content" );

	let paises = [

		["España", "Madrid"],
		["Francia", "París"],
		["Bulgaria", "Sofía"],
		["Suiza", "Berna"],
		["Holanda", "Ámsterdam"],

	];

	// Creamos la tabla con elementos

	let tabla = document.createElement( "table" );

	for (var i = -1; i < paises.length; i++) {

		let fila = document.createElement( "tr" );

		if(i==-1){
			let col1 = document.createElement( "td" );
			let col2 = document.createElement( "td" );

			col1.appendChild( document.createTextNode("País") );
			col2.appendChild( document.createTextNode("Capital") );

			fila.appendChild(col1);
			fila.appendChild(col2);

			col1.style.padding = "10px";
			col1.style.border = "1px solid red";

			col2.style.padding = "10px";
			col2.style.border = "1px solid red";

			tabla.appendChild(fila);
		}else{
			let nombre = paises[i][0];
			let capital = paises[i][1];

			let c_nombre = document.createElement( "td" );
			let c_capital = document.createElement( "td" );

			fila.appendChild(c_nombre);
			fila.appendChild(c_capital);

			c_nombre.style.padding = "10px";
			c_nombre.style.border = "1px solid black";

			c_capital.style.padding = "10px";
			c_capital.style.border = "1px solid black";

			c_nombre.appendChild( document.createTextNode(nombre) );
			c_capital.appendChild( document.createTextNode(capital) );

			tabla.appendChild(fila);
		}

	}

	tabla.style.borderCollapse = "collapse";

	contenido.appendChild(tabla);



}
