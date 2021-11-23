import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';

//const db = getFirestore(app);
const Auth = getAuth();
const signupform = document.getElementById("signup-form");

signupform.addEventListener('submit', (e) =>{
    e.preventDefault();

    const signupmail = document.getElementById("signup-email").value;
    const signuppassword = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(Auth, signupmail, signuppassword)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    signupform.reset();
    $('#signup').modal('hide')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
})

function validate_email(email){
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true){
    //Email structure
    return true
  } else {
    //Its not an email
    return false
  }
}

function validate_password(password){
  if (password < 6){
    return false
  } else{
    return true
  }
}