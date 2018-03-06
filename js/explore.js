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
    let desserts = document.getElementById('dessert');
    let breakfast = document.getElementById('breakfast');
    let pasta = document.getElementById('pasta');
    let chicken = document.getElementById('chicken');
    let vegan = document.getElementById('vegan');
    let all = document.getElementById('all');
    let recipeMount = document.getElementById('js-recipe-mount');

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
            console.log('user logged in!');
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
