const MIN_TEXT = 3;
const MIN_PASS = 6;
const REGEX_NUMEROS = /\d+/;

function getEstudioSeleccionado(lista){

	for(let i = 0; i < lista.length; i++){
		if( lista[i].checked ){

			return lista[i].value;

		}
	}


}

function getInteresesArray(intereses){

	let intereses_ = [];

	for (let i = 0; i < intereses.length; i++) {
		if( intereses[i].checked ){
			intereses_.push(intereses[i].name);
		}
	}

	return intereses_;

}

function comprobarLogitudTexto(e){

	if (+e.target.value.length < MIN_TEXT || REGEX_NUMEROS.test(e.target.value)){

		e.target.style.borderColor = 'red';

	}else{
		e.target.style.borderColor = 'inherit';
	}

}

function comprobarCampoDireccion(e){
	if (+e.target.value.length < MIN_TEXT){

		e.target.style.borderColor = 'red';

	}else{
		e.target.style.borderColor = 'inherit';
	}
}

function comprobarPassword(e){
	if (+e.target.value.length < MIN_PASS){

		e.target.style.borderColor = 'red';

	}else{
		e.target.style.borderColor = 'inherit';
	}
}

function validarFormulario(){

	if( nombre.value.length < MIN_TEXT || REGEX_NUMEROS.test(nombre.value) ){
		nombre.style.borderColor = 'red';
	}

	if( apellido1.value.length < MIN_TEXT || REGEX_NUMEROS.test(apellido1.value) ){
		apellido1.style.borderColor = 'red';
	}

	if( apellido2.value.length < MIN_TEXT || REGEX_NUMEROS.test(apellido2.value) ){
		apellido2.style.borderColor = 'red';
	}

	if( email.value.length < MIN_TEXT ){
		email.style.borderColor = 'red';
	}

	if( direccion.value.length < MIN_TEXT ){
		direccion.style.borderColor = 'red';
	}

	if( pass.value.length < MIN_TEXT ){
		pass.style.borderColor = 'red';
	}

	if ( getInteresesArray(intereses).length < 2 ){

		document.getElementById("selector_articulos").style.color="red";

	}

}

function comprobarFormulario(e){

	// Cancelamos el submit por defecto
	e.preventDefault();
	//-------------------------------------

	alert( "Nombre: " + nombre.value +
	"\nApellido1: " + apellido1.value +
	"\nApellido2: " + apellido2.value +
	"\nDirección: " + direccion.value +
	"\nCorreo: " + email.value +
	"\nContraseña: " + pass.value +
	"\nSexo: " + sexo.value +
	"\nEstudios: " + getEstudioSeleccionado(estudios) +
	"\nIntereses: " + getInteresesArray(intereses)
	);

	validarFormulario();

}

window.onload = function(){

	nombre = document.getElementsByName("nombre")[0];
	apellido1 = document.getElementsByName("apellido1")[0];
	apellido2 = document.getElementsByName("apellido2")[0];
	direccion = document.getElementsByName("direccion")[0];
	email = document.getElementsByName("e-mail")[0];
	pass = document.getElementsByName("contraseña")[0];
	sexo = document.getElementsByName("sexo")[0];
	estudios = document.getElementsByName("estudios");
	intereses = document.querySelectorAll("input[type='checkbox']");

	nombre.oninput = comprobarLogitudTexto;
	apellido1.oninput = comprobarLogitudTexto;
	apellido2.oninput = comprobarLogitudTexto;
	direccion.oninput = comprobarCampoDireccion;
	pass.oninput = comprobarPassword;


	window.onsubmit = comprobarFormulario;

}
