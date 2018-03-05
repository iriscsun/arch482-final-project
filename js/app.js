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

    let signup_form = document.getElementById('signup-form');
    let login_form = document.getElementById('login-form');
    let signout = document.getElementById('signout');
    
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
    
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let firstName = document.getElementById('first-name').value;
        let lastName = document.getElementById('last-name').value;
        let userName = document.getElementById('username').value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log('user ' + user.uid + ' created');

                let postData = {
                    name: firstName + lastName,
                    email: email,
                    username: userName
                }

                let updates = {};
                updates['/users/' + user.uid] = postData;
                firebase.database().ref().update(updates);
                firebase.database().ref('/users/').on('child_added', (snapshot) => {
                    window.location.href = "./explore.html";
                });

            })
            .catch(err => {
                console.log(err);
            });
    
    });
    
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
            console.log(user);
            signout.style.display = "block";
            signout.style.cursor = "pointer";
            signout.addEventListener('click', () => {
                firebase.auth().signOut();
                window.location.href = "./index.html";
            });
            window.location.href = "./explore.html";
        }
        else {
            console.log('no user logged in!');
            signout.style.display = "none";
        }
    });

}

