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

let userid;
let ref;
let myRecipes;

window.onload = () => {

    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let name = document.getElementById('name');
    let recipes = '#recipes';
    let savedRecipes = '#saved-recipes';
    let signout = document.getElementById('signout');

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            ref = firebase.database().ref('/users/' + user.uid);
            rec_ref = firebase.database().ref('/recipes/');
            ref.once('value', snapshot => {
                username.innerHTML = username.innerHTML + ' ' + snapshot.val().username;
                email.innerHTML = email.innerHTML + ' ' + snapshot.val().email;
                name.innerHTML = name.innerHTML + ' ' + snapshot.val().name;
                snapshot.val().recipes.forEach(element => {
                    firebase.database().ref('/recipes/' + element).once('value', snapshot => {
                        let rec = recipeToDOMString(snapshot.val());
                        $(recipes).append(rec);
                    });
                });
                snapshot.val().savedRecipes.forEach(element => {
                    firebase.database().ref('/recipes/' + element).once('value', snapshot => {
                        let rec = recipeToDOMString(snapshot.val());
                        $(savedRecipes).append(rec);
                    });
                });
            });
            console.log('user logged in!');
            console.log(user.uid);
            userid = user.uid;
            signout.style.display = "block";
            signout.style.cursor = "pointer";
            signout.addEventListener('click', () => {
                firebase.auth().signOut();
                window.location.href = "./index.html";
            });

        }
        else {
            console.log('no user logged in!');
            signout.style.display = "none";
            window.location.href = "./index.html";
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