
/**
 * 
 * @param {*} nombre : Objeto input
 * @param {*} correo : Objeto input
 * @param {*} mensaje : Objeto input
 * 
 * @returns : Envía el formulario y muestra una alerta.
 *
 */

function enviarFormulario( nombre, correo, mensaje, tipo_prop ){

       alert( "Nombre: " + nombre.value + "\nCorreo: " + correo.value + "\nMensaje: " + mensaje.value +"\nTipo propiedad: " + tipo_prop);

       Eggy({
              title:  'Formulario enviado',
              message:  'Tu duda ha sido enviada a nuestro departamento de ventas.',
              duration: 1000,
       });
       setTimeout( function(){
              window.location.href = "./";
       }, 1000);

}

/**
 * 
 * @param {string} nombre_inmueble : El nombre del inmueble seleccionado.
 * @returns : Crea con createElement un formulario de contacto.
 */

function formularioContacto( nombre_inmueble ){

       let campos_completados = [];
       let formulario = document.createElement( 'form' );
       let nombre = document.createElement( 'input' );
       let correo = document.createElement( 'input' );
       let mensaje = document.createElement( 'textarea' );
       let boton_enviar = document.createElement( 'button' );
       let checkboxes = [ "Casa", "Piso", "Chalet" ];

       formulario.innerHTML = "<br><h3>¿Está interesado?</h3><p>Contacta con nosotros y obtén más información sobre el inmueble.</p>";

       nombre.type = "text";
       correo.type = "email";
       boton_enviar.type = "submit";

       nombre.className = "form-control";
       correo.className = "form-control";
       mensaje.className = "form-control";
       boton_enviar.className = "btn_base";

       nombre.style = "display:inline-block; width:20%; margin-right:10px;";
       correo.style = "display:inline-block; width:20%; margin-right:10px;";
       mensaje.style = "display:block; margin-top:10px;";
       boton_enviar.style = "width:30%";

       nombre.style.width = "30%";
       correo.style.width = "30%";

       nombre.placeholder = "Nombre";
       correo.placeholder = "correo@gmail.com";
       mensaje.placeholder = "Su consulta sobre " + nombre_inmueble;

       boton_enviar.innerHTML = "Enviar";
       boton_enviar.disabled = true;

       formulario.appendChild( nombre );
       formulario.appendChild( correo );

       formulario.appendChild( document.createElement( "br" ) );
       formulario.appendChild( document.createElement( "br" ) );

       checkboxes.forEach( item =>{

              let label = document.createElement( "label" ); 
              let checkbox = document.createElement( "input" );

              label.innerHTML = item;
              label.className = "label-formulario";
              checkbox.type = "radio";
              checkbox.name = "tipo_propiedad";
              checkbox.className = "form-check-input";
              checkbox.value = item;

              formulario.appendChild( checkbox );
              formulario.appendChild( label );

              checkbox.addEventListener( "click", e =>{
                     
                     e.target.checked == true ? campos_completados[3] = e.target.value : campos_completados[3] = false;

              } );

       } );

       formulario.appendChild( document.createElement( "br" ) );
       formulario.appendChild( document.createElement( "br" ) );

       formulario.appendChild( mensaje );
       formulario.appendChild( boton_enviar );

       /**
        * EVENTOS DE ESCUCHA DEL FORMULARIO
        */

       nombre.addEventListener( "input", function( event ) {

              if ( this.value.length < 5 ){
                     this.style.borderColor = "rgba(255,0,0,0.3)";
                     this.setCustomValidity( "Coloca un nombre válido. Mínimo 5 carácteres." );
                     campos_completados[0] = false;
              }else{
                     this.style.borderColor = "rgba(0,0,0,0.2)";
                     this.setCustomValidity( "" );
                     campos_completados[0] = true;
              }

       });

       correo.addEventListener( "input", function( event ) {

              if ( !validateEmail(this.value) ){
                     this.style.borderColor = "rgba(255,0,0,0.3)";
                     this.setCustomValidity( "Coloca un correo válido." );
                     campos_completados[1] = false;
              }else{
                     this.style.borderColor = "rgba(0,0,0,0.2)";
                     this.setCustomValidity( "" );
                     campos_completados[1] = true;
              }

       });

       mensaje.addEventListener( "input", function( event ) {

              if ( this.value.length < 5 ){
                     this.style.borderColor = "rgba(255,0,0,0.3)";
                     this.setCustomValidity( "Escribe tu duda acerca del inmueble. Mínimo 5 carácteres." );
                     campos_completados[2] = false;
              }else{
                     this.style.borderColor = "rgba(0,0,0,0.2)";
                     this.setCustomValidity( "" );
                     campos_completados[2] = true;
              }

       });

       formulario.addEventListener( "input", function( event ){

              campos_completados.filter((item) => {return item}).length >= 4 ? boton_enviar.disabled = false : boton_enviar.disabled = true;

       });

       formulario.addEventListener( "submit", function( event ) {

              event.preventDefault();

              enviarFormulario( nombre, correo, mensaje, campos_completados[3] );

       });

       // ------------------------------------------------------------------

       return formulario;
}