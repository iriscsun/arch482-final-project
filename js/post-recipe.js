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
let myRecipes = [];

window.onload = () => {

    let signout = document.getElementById('signout');
    //let recipeForm = document.getElementById('recipe-form');
		//recipeForm.addEventListener('submit', e => {
		//e.preventDefault();

		let submitBtn = document.getElementById('submit');
		submitBtn.addEventListener('click', function() {

        let ing = [];

        let name = document.getElementById('name').value;
        let servingSize = $("#serving-size option:selected").text();
        let recipeTime = $("input[name='inlineRadioOptions']:checked").next()[0].innerText || "";
        let cookingDirections = document.getElementsByClassName('cooking-directions')[0].value;
        let tags = document.getElementById('tags').value;
        let ingredients = document.getElementsByClassName('ingredient');

        for(let i = 0; i < ingredients.length; i++) {
            ing.push(ingredients[i].value);
        }

        let postData = {
            name: name,
            servingSize: servingSize,
            recipeTime: recipeTime,
            cookingDirections: cookingDirections,
            tags: tags,
            ingredients: ing
        }

        let recipekey = firebase.database().ref().child('recipes').push().key;
        myRecipes.push(recipekey);
        let recipe_updates = {};
        let user_updates = {};
        recipe_updates['/recipes/' + recipekey] = postData;
        user_updates['/users/' + userid + '/recipes'] = myRecipes;
        firebase.database().ref().update(recipe_updates);
        firebase.database().ref().update(user_updates);

        firebase.database().ref('/recipes/').on('child_added', (snapshot) => {

            location.reload();

        });

    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
            userid = user.uid;
            let ref = firebase.database().ref('/users/' + user.uid + '/recipes');
            myRecipes = ref.once('value')
                .then(snapshot => {
                    myRecipes = snapshot.val() || [];
                    console.log(myRecipes);
                });
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
        }
    });

}
