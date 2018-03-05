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

    let signout = document.getElementById('signout');

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            ref = firebase.database().ref('/users/' + user.uid + '/recipes');
            myRecipes = ref.once('value').then(snapshot => {
                            myRecipes = snapshot.val() || [];
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
