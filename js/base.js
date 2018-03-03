//on document load
$(document).ready(function () {

	//load in nav bar to html pages, uncomment this line of code when uploading to server
	//$('#nav').load('../arch482-final-project/nav.html');
	$('#nav').load('../nav.html');
});

var counter = 1;
var limit = 15;

//adds a new field when the add ingredient button is clicked
function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('span');
          newdiv.innerHTML ="<br><input class='field' type='text' name='ingredients[]' placeholder='Ingredient " + (counter + 1) + "'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}
