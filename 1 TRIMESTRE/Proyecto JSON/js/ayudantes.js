
/**
 * 
 * @param {string} email : El correo elegido para validar.
 * @returns {boolean} : True si el correo es válido, false si no.
 * 
 */
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

// ---------------------------------------------------------------------

/**
 * 
 * @param {*} array : Array con elementos para saber si ya existe el índice o no.
 * @returns {int} : Índice random generado sin repetirse.
 */

function getValorRandom( array ){

       let indice = Math.floor(Math.random() * array_pisos.length);
       if( array.includes( array_pisos[indice] ) ){
              return getValorRandom( array );
       }

       return indice;

}

// ---------------------------------------------------------------------

/**
 * 
 * @returns : Crea un div de piso random en base al índice generado y lo agrega al div de
 *            destacados
 * 
 */

function getDestacados(){

       let array_elegidos = [];

       div_lista_destacados.innerHTML = "";

       for (let i=0; i < 3; i++){

              let max = getValorRandom(array_elegidos);

              array_elegidos.push(array_pisos[max]);

       }

       array_elegidos.forEach((element) => {

              div_lista_destacados.appendChild(crearDivPiso(element));

       });
       
}