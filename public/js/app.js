<<<<<<< HEAD
window.onload = function() {
	var select = document.getElementById('seats');
	for (var i = 0; i<40; i++){
	    var option = document.createElement('option');
	    option.value = i+1;
	    option.innerHTML = i+1;
	    select.options.add(option);
	}
=======
window.onload = function() {
	var select = document.getElementById('seats');
	for (var i = 0; i<40; i++){
	    var option = document.createElement('option');
	    option.value = i+1;
	    option.innerHTML = i+1;
	    select.options.add(option);
	}
>>>>>>> d3683dd45e4129d847de2aa83d36a0780d100458
}