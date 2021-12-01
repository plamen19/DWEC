window.onload = ()=> {
    fetch("http://ip.jsontest.com/").
        then((resp)=>{
            return resp.json();
        }).
        then((resposta)=>{
            let cadena = "La IP que torna el servidor és: " + resposta.ip;
            document.getElementById("contingut").innerHTML = cadena;
        }).
        catch((error)=>{
		console.log("Hi ha hagut un error")
	 }
        );
}
