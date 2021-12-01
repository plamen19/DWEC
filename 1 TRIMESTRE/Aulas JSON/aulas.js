let div;
let timer_recarga;

let imgSO = {
	['Linux']: "http://assets.stickpng.com/images/58480e82cef1014c0b5e4927.png",
	['Lliurex']: "https://portal.edu.gva.es/cvtic/wp-content/uploads/sites/15/2019/04/logo-lliurex.png",
	['Windows']: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/200px-Windows_logo_-_2012.svg.png",
}



function getEstadoAula(){
	div.innerHTML = "";
	fetch( "https://plamen19.github.io/jsontest/aulas.json" ).then(value => { return value.json(); }).then(resp => {

		for (let i = 0; i < resp.length; i++) {
			let pc = resp[i];
			div.innerHTML += "<tr><td>"+pc.pc+"</td><td>"+pc.alumno+"</td><td>"+(imgSO[pc.so] ? "<img src='"+ imgSO[pc.so] +"'/>" : pc.so)+"</td><td>"+(pc.encendido ? "<i style='color:rgb(0,200,0);font-size:30px;' class='bi bi-pc-display'></i>" : "<i style='color:red; font-size:30px;' class='bi bi-pc-display'></i>" )+"</td></tr>";
		}

	});
}

function limpiarDatos(){

	div.innerHTML = "";

	Eggy({
	    title:  'Datos limpiados',
	    message:  'Los datos se han limpiado correctamente',
	    duration: 1000,
	});

}

function recargarDatos(){

	if (!timer_recarga){

		Eggy({
		    title:  'Recargando',
		    message:  'Recargando la información...',
		    type:  'info',
		    duration: 1000,
		});

		getEstadoAula();

		timer_recarga = setTimeout(()=>{timer_recarga = null}, 1000);

	}

}

// Al cargar la web, pillamos el DIV con la ID y refrescamos la tabla.

window.onload = ()=>{

	div = document.getElementById("pcs");

	setTimeout(getEstadoAula,1000);

}
