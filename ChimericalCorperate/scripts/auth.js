// This javascript file controls the authentication & management of the Firebase Auth functions 
// This javascript file also controls the firebase env creation n memorialization to firebase datastore. 

// listen for auth status changes + the if statement checks and sends a dif console message if user logged in/out
auth.onAuthStateChanged(user => {
    if (user) {
        //get data from database
        db.collection('guides').onSnapshot(snapshot => {
         setupGuides(snapshot.docs);   
         // checks for the user being authenticated, this dictates the navlinks
         setupUI(user);
        });
    } else {
        setupUI();
        setupGuides([]);
    }
});

// create guide (env)
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //clear form & close model
        const modal = document.querySelector('#modal-create'); 
        M.Modal.getInstance(modal).close();
        createForm.reset();    
    }).catch(err => {
        console.log(err.message)
    })
})


// signup method
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user values from sign up form
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up User with the Firebase get email + password method 
    // this also asks for the C32 Agent ID.
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            c32agentID: signupForm['C32-Agent'].value
        })
    }).then(() => {
        const modal = document.querySelector('#modal-signup'); 
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout method
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault(); //prevents page from reloading
    auth.signOut()
})

// sign-in ~ login methods, after Sign Up 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents page from reloading

    // get user info to login
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        //close the login model & reset form
        const modal = document.querySelector('#modal-login'); 
        M.Modal.getInstance(modal).close();
        loginForm.reset();

    })
})
