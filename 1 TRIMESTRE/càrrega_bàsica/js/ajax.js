window.onload = ()=> {
    carregaJSON();
}

function carregaJSON(){
    let peticio = new XMLHttpRequest();
    peticio.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let resposta = peticio.responseText;
            ajaxOK(resposta);
        }
    }
    peticio.open("GET", "http://ip.jsontest.com/", true);
    peticio.send();
}

function ajaxOK(resp){
    let ip = JSON.parse(resp);
    let cadena = "La IP que torna el servidor és: " + ip.ip;
    document.getElementById("contingut").innerHTML = cadena;
}