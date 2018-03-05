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

window.onload = () => {

    let signout = document.getElementById('signout');

    let ref = firebase.database().ref('/users/' + user.uid + '/recipes');
		let myRecipes = ref.once('value')
                        .then(snapshot => {
                            myRecipes = snapshot.val() || [];
                            console.log(myRecipes);
                        });
						
		/*
		console.log("user id: " + firebase.auth().currentUser.uid);

		let ref = firebase.database().ref('/users/')
			ref.once('value')
				.then(function(snapshot) {
				console.log(snapshot.val());
			});
		*/


    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
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
