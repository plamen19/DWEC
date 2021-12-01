
/**
 * 
 * @returns : Filtra en un array las propiedades según los filtros elegidos y los carga
 *           en el div de contenido.
 * 
 */
function filtrarPropiedades(){

       array_ordenado = array_pisos;

       if( filtros[0] && filtros[0] != "todos" && filtros[0] != "undefined" ){
              array_ordenado = array_ordenado.filter(o => (o.tipo == filtros[0]));
       }
       
       if( filtros[1] != null && filtros[1] != "undefined" ){
              array_ordenado = array_ordenado.filter(o => (+o.precio >= +filtros[1]));
       }

       if( filtros[2] != null && filtros[2] != "undefined" && filtros[2] != "todos" ){
              
              filtros_oferta.forEach( element => {
                     if( element.checked ){
                     
                            array_ordenado = array_ordenado.filter(o => (o.tipo_oferta == element.value));

                     }
              });

       }

       filtro_precio.max = Math.max(...array_ordenado.map(o => o.precio), 0);

       cargarDivsPisos(array_ordenado);

}

// ----------------------------------------------------------------------

/**
 * 
 * @param {*} e : Objeto evento.
 * 
 * @returns : Cambia el array de filtros y ejecuta filtrarPropiedades();
 * 
 */

function cambiarFiltro(e){


       switch( e.target.id ){

              case "filtro_precio":
                     filtros[1] = +e.target.value;
                     document.getElementById("precio_elegido").innerHTML = e.target.value + "€";
                     break;
              case "filtro_tipo_propiedad":
                     filtros[0] = e.target.value
                     break;
              default: break;

       }

       if( e.target.name == "filtro_oferta" ){
              
              if( filtro_oferta_alquiler.checked && filtro_oferta_venta.checked ){

                     filtros[2] = "todos";

              }else{

                     filtro_oferta_alquiler.checked ? filtros[2] = "alquiler" : (filtro_oferta_venta.checked ? filtros[2] = "venta" : filtros[2] = "todos");

              }

       }

       filtrarPropiedades();

}

// ----------------------------------------------------------------------

/**
 * 
 * @param {*} texto : El texto escrito en la barra de búsqueda.
 * 
 * @returns : Crea un array con los pisos que contengan la palabra buscada en el nombre
 *            o la ubicación. Posteriormente, carga en la lista de pisos este array filtrado
 *            y envía el scroll del usuario al final para poder verlos.
 * 
 */

function buscarPalabras(texto){

       if( !array_ordenado || array_ordenado.length == 0 ){
              array_ordenado = array_pisos;
       }

       array_ordenado = array_ordenado.filter( e => ( 
              e.nombre.toLowerCase().includes(texto.toLowerCase()) ||
              e.ubicacion.toLowerCase().includes(texto.toLowerCase())
       ) );


       cargarDivsPisos(array_ordenado);

       div_contenido_pisos.scrollIntoView();

}