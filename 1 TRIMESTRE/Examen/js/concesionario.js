let lista_tipos;
let div_contenido;
let div_info_coches;
let btn_enviar_formulario;
let nombre, comentarios, check_colores;
let campos_completados = [];

/*
	FORMATO DEL JSON
	{

		TIPO_COMBUSTIBLE: [
			{COCHE, EXTRAS:[ {EXTRA}, {EXTRA} ]}
		]

	}
*/

let vehs_json = '{ "hibridos": [{"marca":"Toyota", "modelo":"Yaris", "kms":4120, "foto":"https://sx-content-labs.sixt.io/Media/8fleet-1050x600/toyota-yaris-5d-weiss-2017.png","extras":[{"extra":"Volante de cuero", "p_original":3000, "p_rebajado":1200}, {"extra":"Radio BT", "p_original":500, "p_rebajado":150}, {"extra":"Llantas negras", "p_original":1500, "p_rebajado":800}]},{"marca":"Hyundai", "modelo":"Ioniq", "kms":12453, "foto":"https://www.evexpert.es/resize/afu/300/185/files/graphics-products/electric-cars/hyundai-ioniq.png"},{"marca":"Toyota", "modelo":"Yaris", "kms":4120, "foto":"https://sx-content-labs.sixt.io/Media/8fleet-1050x600/toyota-yaris-5d-weiss-2017.png", "extras":[{"extra":"Pantalla", "p_original":500, "p_rebajado":100}]},{"marca":"Toyota", "modelo":"Yaris", "kms":4120, "foto":"https://sx-content-labs.sixt.io/Media/8fleet-1050x600/toyota-yaris-5d-weiss-2017.png"}], "combustion":[{"marca":"BMW", "modelo":"E46", "kms":221512, "foto":"https://static.wikia.nocookie.net/forzamotorsport/images/8/85/HOR_XB1_BMW_M3_05.png/revision/latest?cb=20190916185312","extras":[{"extra":"Volante M3", "p_original":3000, "p_rebajado":800}, {"extra":"Faldones", "p_original":1200, "p_rebajado":500}]},{"marca":"Ford", "modelo":"Focus", "kms":121876, "foto":"https://purepng.com/public/uploads/large/purepng.com-fordfordcarfodr-carvehicle-1701527484256fm2ov.png"}] }';

/*
	LISTA EXTRAS
	{

		Devuelve un 'string' con una lista HTML de todos los extras.

	}
*/

function getTextoExtras(extras){

	let textoExtras = "<ul>";

	if(extras){

		for (let i = 0; i < extras.length; i++) {
			let extra = extras[i];
			textoExtras += "<li>" + extra.extra + " (<s>"+extra.p_original+"€</s>/"+extra.p_rebajado+"€)</li>";
		}
		textoExtras += "</ul>";
		return textoExtras;

	}else{
		return "De serie";
	}

}

/*
	VALIDADOR DE CAMPOS
	{

		Valida los campos y comprueba si están todos completados o no.

	}
*/

function validarCampo(e){

	let btn_enviar = document.getElementById('botonEnviar');

	switch( e.target.name ){
		case "nombre":
			e.target.value.length > 5 ? campos_completados[0] = true : campos_completados[0] = false;
			break;
		case "colores":
			let seleccionados = 0;
			check_colores.forEach((item, i) => {
				if (item.checked){
					seleccionados++
				}
			});
			seleccionados >= 2 ? campos_completados[1] = true : campos_completados[1] = false;
			break;
		case 'comentarios':
			e.target.value.length >= 10 ? campos_completados[2] = true : campos_completados[2] = false;
			break;
		default: break;
	}

	campos_completados.filter((item) => {return item}).length >= 3 ? btn_enviar.disabled = false : btn_enviar.disabled = true;

}

/*
	CARGA DE FORMULARIO
	{

		Carga todo el formulario con innerHTML en el contenedor.

	}
*/

function cargarFormulario(marca, modelo){

	div_info_coches.style.textAlign = 'left';

	div_info_coches.innerHTML = "<br><h3>Formulario de contacto</h3><br><p>Introduce tus datos y te informaremos más a fondo sobre el coche.</p>";

	div_info_coches.innerHTML += "<br><label>Nombre: </label><input type='text' name='nombre'></input><br>";
	div_info_coches.innerHTML += "<br><label>Colores: </label><input type='checkbox' value='rojo' name='colores'>Rojo</input> <input type='checkbox' value='verde' name='colores'>Verde</input><input type='checkbox' value='blanco' name='colores'>Blanco</input><input type='checkbox' value='negro' name='colores'>Negro</input>";
	div_info_coches.innerHTML += "<br><br><label>Comentarios: </label><br><textarea rows='10' cols='40' placeholder='Estoy interesado en el "+marca+" "+modelo+"' name='comentarios'></textarea>";
	div_info_coches.innerHTML += "<br><br><button id='botonEnviar' disabled>Enviar</button><button onclick='cargarVehiculosTipo()' id='botonVolver'>Volver</button>";

	check_colores = document.getElementsByName('colores');
	nombre = document.getElementsByName('nombre')[0];
	comentarios = document.getElementsByName('comentarios')[0];
	btn_enviar_formulario = document.getElementById("botonEnviar");


	nombre.addEventListener( "input", validarCampo );
	comentarios.addEventListener( "input", validarCampo );


	btn_enviar_formulario.addEventListener( "click", () => {

		alert("Tu nombre: " + nombre.value + "\n" + "Colores seleccionados: " + Array.from(check_colores).filter(color =>{return color.checked}).map(function(i){return i.value}) + "\n");
	
	} );


	
	check_colores.forEach((color, i) => {
		color.addEventListener("click", validarCampo);
	});


}

/*
	CARGA PÁGINA PRINCIPAL
	{

		Parsea el JSON de los vehículos y los carga todos en div's separados con sus
		características, fotos, etc.

	}
*/

function cargarVehiculosTipo(){

	let s_index = lista_tipos[lista_tipos.selectedIndex].value;

	let parseado = JSON.parse(vehs_json);

	div_info_coches.style.textAlign = 'center';


	if( s_index == "Todos" ){

		let todos = [];

		parseado["hibridos"].map((item) => {todos.push(item)});
		parseado["combustion"].map((item) => {todos.push(item)});

		div_info_coches.innerHTML = "<br>Encontrados <b style='color:orange;'>" + todos.length + "</b> coches.<br><br>";

		for (let i = 0; i < todos.length; i++) {
			let coche_tipo = todos[i];
			div_info_coches.innerHTML += "<div class='infocoche'><h3>"+coche_tipo.marca + " " + coche_tipo.modelo + "</h3><br><img src='"+ coche_tipo.foto +"'/><br><b>KMS:</b> <span style='color:rgb(255,150,0);'>"+coche_tipo.kms+"</span><br><b>Extras:</b> "+getTextoExtras(coche_tipo.extras)+"<br><br><button onclick=cargarFormulario('"+coche_tipo.marca+"','"+coche_tipo.modelo +"')>Saber más...</button></div>"
		}

	}else{
		if( parseado[s_index] ){
			div_info_coches.innerHTML = "<br>Encontrados <b style='color:orange;'>" + parseado[s_index].length + "</b> coches de tipo '<i>" + s_index + "</i>'<br><br>";

			for (let i = 0; i < parseado[s_index].length; i++) {
				let coche_tipo = parseado[s_index][i];
				div_info_coches.innerHTML += "<div class='infocoche'><h3>"+coche_tipo.marca + " " + coche_tipo.modelo + "</h3><br><img src='"+ coche_tipo.foto +"'/><br><b>KMS:</b> <span style='color:rgb(255,150,0);'>"+coche_tipo.kms+"</span><br><b>Extras:</b> "+getTextoExtras(coche_tipo.extras)+"<br><br><button onclick=cargarFormulario('"+coche_tipo.marca+"','"+coche_tipo.modelo +"')>Saber más...</button></div>"
			}

		}else{
			div_info_coches.innerHTML = "";
		}
	}


}

window.onload = () => {

 	lista_tipos = document.getElementById("lista_tipo_coche")
	div_contenido = document.getElementById("contenido");
	div_info_coches = document.getElementById("infocoches");

	lista_tipos.onchange = cargarVehiculosTipo;

	cargarVehiculosTipo();
}
