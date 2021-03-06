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
let userid = null;
let savedRecipes;

window.onload = () => {

    let ref = firebase.database().ref('/recipes');
    let desserts = document.getElementById('dessert');
    let breakfast = document.getElementById('breakfast');
    let pasta = document.getElementById('pasta');
    let chicken = document.getElementById('chicken');
    let vegan = document.getElementById('vegan');
    let all = document.getElementById('all');
    let recipeMount = document.getElementById('js-recipe-mount');
    let search = document.getElementById('search');
    

    search.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        let query = document.getElementById('query').value || "";
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(query == item.name) {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    })

    all.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                let rec = recipeToDOMString(item);
                $(RECIPE_DOM_SELECTOR).append(rec);
                $(LOADING_SELECTOR).hide();
            });
        });
    });

    desserts.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(item.tags === 'Dessert') {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    });

    breakfast.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(item.tags === 'Breakfast') {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    });

    pasta.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(item.tags === 'Pasta') {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    });

    chicken.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(item.tags === 'Chicken') {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    });

    vegan.addEventListener('click', () => {
        while(recipeMount.firstChild)
            recipeMount.removeChild(recipeMount.firstChild);
        ref.once('value').then(snapshot => {
            let recipes = snapshot.val();
            $.each(recipes, (index, item) => {
                if(item.tags === 'Vegan') {
                    let rec = recipeToDOMString(item);
                    $(RECIPE_DOM_SELECTOR).append(rec);
                    $(LOADING_SELECTOR).hide();
                }
            });
        });
    });

    ref.once('value').then(snapshot => {
        let recipes = snapshot.val();
        $.each(recipes, (index, item) => {
            let rec = recipeToDOMString(item);
            $(RECIPE_DOM_SELECTOR).append(rec);
            $(LOADING_SELECTOR).hide();
        });
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            userid = user.uid;
            let ref = firebase.database().ref('/users/' + user.uid + '/savedRecipes');
            ref.once('value').then(snapshot => {
                    savedRecipes = snapshot.val() || [];
                });
        }
        else {
            console.log('no user logged in!');
        }
    });

}

saveRecipe = (id) => {
    savedRecipes.push(id);
    let saved_recipes_updates = {};
    saved_recipes_updates['/users/' + userid + '/savedRecipes'] = savedRecipes;
    firebase.database().ref().update(saved_recipes_updates).then(() => {
        console.log('recipe added');
    })
}

function recipeToDOMString(recipe) {

        let addSave = '';
        if(recipe.userid != userid) {
            addSave = '<span id=' + recipe.key + ' class="save-recipe btn-outline-success" onclick="saveRecipe(this.id)">Save<span/>'
        }
        if(userid == null)
            addSave = '';


		return (
			'<div class="recipe-item">'
				+ '<div class="row">'
					+ '<div class="col-6 col-md-4">'
						+ '<h4>' + recipe.name + '</h4><br>'
						+ '<img width="250" src=' + recipe.image + '></br></br>'
						+ '<b>Recipe Time: </b>' + recipe.recipeTime + '<br>'
						+ '<b>Serves: </b>' + recipe.servingSize + '<br>'
						+ '<b>Tags: </b>' + recipe.tags + '<br><span class="more-info">'
						+ '<b>Ingredients: <br></b><ul><li>' + recipe.ingredients.join("</li><li>") + '</li></ul>'
		                + addSave
					+ '</div>'
					+ '<div class="col col-md-8">'
						+ '<b>Cooking Directions: </b>' + recipe.cookingDirections + '<br></span>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
	);
}
