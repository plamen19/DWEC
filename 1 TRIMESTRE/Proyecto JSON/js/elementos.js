/**
 * 
 * @param {*} element : Objeto que contiene la información de la vivienda seleccionada.
 * 
 * @returns : Un div con el nombre, precio, ubicación y foto de la vivienda.
 * 
 */

function crearDivPiso( element ){
       let div = document.createElement('div');
       let img_piso = document.createElement("img");
       let h5_nombre = document.createElement("h5");
       let p_ubicacion = document.createElement("p");
       let p_precio = document.createElement("p");
       let btn_ver = document.createElement("button");

       p_precio.className = "precio";
       btn_ver.className = "btn_ver_propiedad";
       div.className = 'propiedad';

       img_piso.src = "./assets/pisos/" + element.tipo_oferta + "/" + element.fotos[0] + ".jpg";
       h5_nombre.appendChild( document.createTextNode(element.nombre) );
       p_ubicacion.appendChild( document.createTextNode(element.ubicacion));
       p_precio.innerHTML = (element.precio)+"€"+(element.tipo_oferta == 'alquiler' ? '/mes' : '')+""+(element.rebaja ? '<span class="rebaja">Ha bajado '+(element.precio-element.rebaja)+'€ <i class="bi bi-arrow-down"></i></span>' : '');
       btn_ver.innerHTML = "Saber más...";


       div.appendChild(img_piso);
       div.appendChild(h5_nombre);
       div.appendChild(p_ubicacion);
       div.appendChild(p_precio);
       div.appendChild(btn_ver);

       btn_ver.addEventListener("click", function(e) {
              verPropiedad(element);
       });

       return div;
}

/**
 * 
 * @param {*} e : Objeto que contiene la información de la vivienda seleccionada.
 * 
 * @returns : Una vista con toda la información sobre el inmueble y un formulario de contacto.
 */

function verPropiedad( e ){
       div_contenido.innerHTML = "";
       div_contenido.style.textAlign = "left";

       let foto_actual = 0;
       let formulario = false;
       let intervalo_fotos;
       let h2_nombre = document.createElement( "h2" );
       let p_ubicacion = document.createElement( "p" );
       let a_volver = document.createElement( "a" );
       let img_piso = document.createElement( "img" );
       let area_extra = document.createElement( "div" );
       let p_precio = document.createElement( "p" );
       let p_banos = document.createElement( "p" );
       let p_habitaciones = document.createElement( "p" );
       let p_m2 = document.createElement( "p" );
       let div_paso_imagenes = document.createElement( "div" );
       let btn_contactar = document.createElement( "button" );
       
       h2_nombre.appendChild( document.createTextNode(e.nombre) );
       p_ubicacion.appendChild( document.createTextNode(e.ubicacion));
       h2_nombre.innerHTML += " <span class='etiqueta_tipo'>"+(e.tipo_oferta[0].toUpperCase() + e.tipo_oferta.substr(1))+"</span>";
       btn_contactar.className = "btn_base";
       img_piso.className = "fotos_propiedad";
       p_precio.className = "precio";
       a_volver.className = "a_volver";
       div_paso_imagenes.className = "div_paso_imagenes";

       area_extra.className = "area_extra";

       p_banos.className = "texto_extra";
       p_habitaciones.className = "texto_extra";
       p_m2.className = "texto_extra";
       p_banos.innerHTML = "<i class='fas fa-bath'></i> " + e.banos + " Baños";
       p_habitaciones.innerHTML = "<i class='fas fa-bed'></i> " + e.habitaciones + " Habitaciones";
       p_m2.innerHTML = "<i class='fas fa-ruler-combined'></i> "+ e.m2 +" M2";
       
       a_volver.innerHTML = "<i class='bi bi-arrow-left-circle-fill'></i> Volver";
       a_volver.href = "./";
       img_piso.src = "./assets/pisos/" + e.tipo_oferta + "/" + e.fotos[0] + ".jpg";
       btn_contactar.innerHTML = "Contactar con el propietario";

       btn_contactar.style = "margin:0 auto;";
       
       p_precio.innerHTML = (e.precio)+"€"+(e.tipo_oferta == 'alquiler' ? '/mes' : '')+""+(e.rebaja ? '<span class="rebaja">Ha bajado '+(e.precio-e.rebaja)+'€ <i class="bi bi-arrow-down"></i></span>' : '');

       div_contenido.appendChild(h2_nombre);
       div_contenido.appendChild(p_ubicacion);
       div_contenido.appendChild(a_volver);
       div_contenido.appendChild(p_precio);
       div_contenido.appendChild(img_piso);

       div_contenido.appendChild(div_paso_imagenes);

       area_extra.appendChild(p_habitaciones);
       area_extra.appendChild(p_banos);
       area_extra.appendChild(p_m2);

       div_contenido.appendChild(area_extra);

       for (let i = 0; i < e.fotos.length; i++){

              let paso_imagen = document.createElement( "div" );

              i == 0 ? paso_imagen.style.backgroundColor = "rgba(255,150,0,0.8)" : paso_imagen.style.backgroundColor = "rgba(255,150,0,0.3)";

              paso_imagen.className = "paso_imagen";
              paso_imagen.id = "paso_" + i;

              div_paso_imagenes.appendChild( paso_imagen );

              paso_imagen.addEventListener( "click", function(){

                     document.getElementById( "paso_" + foto_actual ).style.backgroundColor = "rgba(255,150,0,0.3)";

                     foto_actual = i;

                     if( intervalo_fotos ){
                            clearInterval( intervalo_fotos );
                            intervalo_fotos = null;
                     }

                     img_piso.src = "./assets/pisos/" + e.tipo_oferta + "/" + e.fotos[foto_actual] + ".jpg";

                     document.getElementById( "paso_" + foto_actual ).style.backgroundColor = "rgba(255,150,0,0.8)";

              } );

       }


       intervalo_fotos = setInterval(function(){

              let paso_anterior = document.getElementById( "paso_" + foto_actual );
              paso_anterior.style.backgroundColor = "rgba(255,150,0,0.3)";
              foto_actual++;
              if( foto_actual > (e.fotos.length-1) ){
                     foto_actual = 0;
              }
              document.getElementById( "paso_" + foto_actual ).style.backgroundColor = "rgba(255,150,0,0.8)";
              img_piso.src = "./assets/pisos/" + e.tipo_oferta + "/" + e.fotos[foto_actual] + ".jpg";

       }, 1500);

       div_contenido.appendChild( document.createElement("br") );
       div_contenido.appendChild( btn_contactar );

       btn_contactar.addEventListener( "click", function(){

              if( !formulario ){
                     formulario = formularioContacto(e.nombre);
                     div_contenido.appendChild( formulario );
              }else{
                     div_contenido.removeChild( formulario );
                     formulario = null;
              }


       } );

       h2_nombre.scrollIntoView();

}