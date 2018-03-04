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
    
        console.log(email);
        console.log(password);
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log('user ' + user.uid + ' created');
            })
            .catch(err => {
                console.log(err);
            });
    
    });
    
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log('user logged in!');
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

