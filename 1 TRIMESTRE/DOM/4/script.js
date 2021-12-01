window.onload = function( ) {

	let imagenes = [
		"https://static-cse.canva.com/blob/650174/1600w-IonzQEC6FFc.jpg",
		"https://i.pinimg.com/originals/8a/69/c4/8a69c4d1a2dbf3a0d736652076390946.jpg",
		"https://1757140519.rsc.cdn77.org/blog/wp-content/uploads/sites/4/2019/01/4-min.jpg",
		"https://www.wallpapertip.com/wmimgs/36-368732_abstract-bright-blue-geometric-shape-vector-geometric-shapes.jpg"
	];

	let fondoRandom = Math.abs(Math.round(Math.random()*imagenes.length-1));

	alert( fondoRandom );

	document.body.style.background = "url("+ imagenes[fondoRandom] +") #E8F7F9";

	// Para que se aprecien todas bien
	document.body.style.backgroundSize = "cover";


}
