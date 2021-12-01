/** ELEMENTOS DEL DOM QUE SE VAN A ACTUALIZAR CON LA INTERACCIÓN DEL USUARIO
 * -------------------------------------------------------------------------
 */

let div_contenedor;
let div_contenido;
let div_lista_destacados;
let div_contenido_pisos;

let form_busqueda;
let btn_form_busqueda;
let input_busq_provincia;
let btn_restablecer_filtros;

let filtro_precio;
let filtro_tipo_propiedad;
let filtro_oferta_venta;
let filtro_oferta_alquiler;

let array_pisos;
let array_ordenado;

let array_destacados;

let filtros = [] // 0 = tipo vivienda, 1 = precio, 2 = tipo de oferta (alquiler, venta, las dos, etc...), 3 = que contenga palabras clave (por la búsqueda)

/** --------------------------------------- **/

/**
 * 
 * @param {*} array_filtrado [OPCIONAL] : Array con pisos filtrados por lo que haya seleccionado el usuario.
 * 
 * @returns : En el div_contenido_pisos integra todos los pisos o los filtrados.
 * 
 */

function cargarDivsPisos(array_filtrado){

       let array_mostrar = array_filtrado ? array_filtrado : array_pisos;

       div_contenido_pisos.innerHTML = "";

       if (array_mostrar.length==0){

              filtro_precio.value = 0;
              filtro_precio.max = Math.max(...array_pisos.map(o => o.precio), 0);
              div_contenido_pisos.innerHTML = "<img style='width:50%; display:block; margin:0 auto;' src='assets/triste.svg'><p style='text-align:center; margin-top:10px; color:rgba(0,0,0,0.4);'>No se han encontrado resultados.<br>Modifica o limpia los filtros e intenta de nuevo.</p>";
       
       }

       array_mostrar.forEach( function (element, k) {

              div_contenido_pisos.appendChild( crearDivPiso(element) );

       });

}

/**
 * @returns : 1.- Carga el JSON desde Github
 *            2.- Limpia el array de pisos
 *            3.- Agregamos toda la información de los pisos del JSON al array de pisos
 *            5.- Al input range del precio le colocamos como máximo el más caro de todos los pisos obtenidos
 *            4.- Generamos los pisos destacados
 * 
 *            [SI NO SE OBTIENE NADA]
 *            Se muestra una alerta de error al usuario y por consola se muestra el error completo.
 */

function cargarJSON(){

       fetch( "https://plamen19.github.io/inmobiliaria/pisos.json",{
              method: 'GET',
       }
       ).then( res =>{

              return res.json();

       }).then( res =>{
              
              array_pisos = [];

              res.alquiler.forEach(element => {
                     element.tipo_oferta = "alquiler";
                     array_pisos.push( element );
              });

              res.venta.forEach(element => {
                     element.tipo_oferta = "venta";
                     array_pisos.push( element );
              });

              array_ordenado = array_pisos;

              filtro_precio.max = Math.max(...array_ordenado.map(o => o.precio), 0);

              cargarDivsPisos(array_pisos);
              getDestacados();

       }).catch( e => {
              Eggy({ title:  'Carga fallida', message:  'No se han podido obtener los datos de las propiedades.', type: 'error', duration: 1500,});
              console.log( "[AJAX] Petición fallada. [" + e + "]" );
       });

}

window.onload = () => {
       
       /**
        *     ALMACENAMOS LOS ELEMENTOS IMPORTANTES O CON LOS QUE VAYAMOS A
        *                       INTERACTUAR EN VARIABLES
        */

       div_contenedor = document.getElementsByClassName("container")[0];
       div_contenido = document.getElementsByClassName("contenido")[0];
       div_lista_destacados = document.getElementById( "lista_destacados" );
       div_contenido_pisos = document.getElementById("lista_propiedades");

       form_busqueda = document.getElementById("form_busq_provincia");
       input_busq_provincia = document.getElementById("input_busq_provincia");
       btn_form_busqueda = document.getElementById("btn_form_busqueda");
       btn_restablecer_filtros = document.getElementById("btn_restablecer_filtros");

       filtro_precio = document.getElementById("filtro_precio");
       filtro_tipo_propiedad = document.getElementById("filtro_tipo_propiedad");

       filtros_oferta = document.getElementsByName( "filtro_oferta" );
       filtro_oferta_alquiler = document.getElementById( "filtro_oferta_alquiler" );
       filtro_oferta_venta = document.getElementById( "filtro_oferta_venta" );
       
       /**
        * 
        * @param {*} e : Objeto de evento.
        * @returns : Busca palabras clave introducidas por el usuario en la ubicación y nombre de alguna propiedad.
        * 
        */

       form_busqueda.onsubmit = (e)=>{e.preventDefault(); buscarPalabras(input_busq_provincia.value);};

       // Eventos para el filtro de precio y el tipo (venta, alquiler)

       filtro_precio.onchange = cambiarFiltro;
       filtro_tipo_propiedad.onchange = cambiarFiltro;

       filtros_oferta.forEach( element => { element.onchange = cambiarFiltro; } );

       // Botón que restablece los filtros

       btn_restablecer_filtros.onclick = ()=>{ 
              filtros_oferta.forEach( element =>{element.checked = false;}); 
              array_ordenado = array_pisos; 
              cargarDivsPisos();
              Eggy({ title:  'Filtros limpios', message:  'Has limpiado todos los filtros de búsqueda.', duration: 800,});
       };

       // Finalmente cargamos todo el JSON

       cargarJSON();

}