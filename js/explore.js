// Initialize Firebase
let config = {
    apiKey: "AIzaSyAMTv6u00ZDTiILop8w4NW7XNbI7624oZ4",
    authDomain: "arch-482.firebaseapp.com",
    databaseURL: "https://arch-482.firebaseio.com",
    projectId: "arch-482",
    storageBucket: "arch-482.appspot.com",
    messagingSenderId: "970186204682"
};
firebase.initializeApp(config);

var RECIPE_DOM_SELECTOR = '#js-recipe-mount';
var LOADING_SELECTOR = '#js-loading-icon';

window.onload = () => {

    let signout = document.getElementById('signout');
    let ref = firebase.database().ref('/recipes');

    // Listening for new recipes
    let recipes = ref.on('child_added', snapshot => {
        console.log(snapshot.val());
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
            console.log(user);
            signout.style.display = "block";
            signout.style.cursor = "pointer";
            signout.addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    console.log('user signed out!');
                    window.location.href = "./index.html";
                });
            });

        }
        else {
            console.log('no user logged in!');
            signout.style.display = "none";
        }
    });

}

function renderAllRecipes() {
	let ref = firebase.database().ref('/recipes');
	var recipes = '';
	ref.once('value')
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				recipes += recipeToDOMString(childSnapshot.val())

		});
	})
	.then(function() {
      $(RECIPE_DOM_SELECTOR).append(recipes);
      $(LOADING_SELECTOR).hide();
  });
}


function recipeToDOMString(recipe) {
		return '<div class="recipe-item">'
				//+ '<img width="300" src=' + recipe.url + '></br>'
				+ '<h4>' + recipe.name + '</h4><br>'
				+ '<b>Recipe Time: </b>' + recipe.recipeTime + '<br>'
				+ '<b>Serves: </b>' + recipe.servingSize + '<br>'
				+ '<b>Tags: </b>' + recipe.tags + '<br><span class="more-info">'
				+ '<b>Ingredients: </b>' + recipe.ingredients.join(', ') + '<br>'
				+ '<b>Cooking Directions: </b>' + recipe.cookingDirections + '<br></span>'
		+ '</div>';
}

renderAllRecipes();
