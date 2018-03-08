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
let isSigningUp = false;

window.onload = () => {

    let signup_form = document.getElementById('signup-form');
    let login_form = document.getElementById('login-form');
    login_form.addEventListener('submit', e => {

        e.preventDefault();

        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('user ' + user.uid + ' logged in');
            })
            .catch(err => {
                console.log(err);
            });

    });

    signup_form.addEventListener('submit', e => {

        e.preventDefault();
        isSigningUp = true;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let firstName = document.getElementById('first-name').value;
        let lastName = document.getElementById('last-name').value;
        let userName = document.getElementById('username').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {

                let postData = {
                    name: firstName + lastName,
                    email: email,
                    username: userName
                }

                let updates = {};
                updates['/users/' + user.uid] = postData;
                firebase.database().ref().update(updates).then(() => {
                    console.log('user added');
                    window.location.href = "./explore.html";
                })

            })
            .catch(err => {
                console.log(err);
            });

    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
            
            if(!isSigningUp) {
                window.location.href = "./explore.html";
            }
        }
        else {
            console.log('no user logged in!');
        }
    });

}
