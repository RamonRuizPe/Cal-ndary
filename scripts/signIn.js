import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const Auth = getAuth();
const signinform = document.getElementById("signin-form");

signinform.addEventListener('submit', e =>{
    e.preventDefault();
    const signinmail = document.getElementById("signin-email").value;
    const signinpassword = document.getElementById("signin-password").value;
    signInWithEmailAndPassword(Auth,signinmail,signinpassword)
    .then((userCredential) => {
        // Signed in
        signinform.reset();
        $('#signin').modal('hide')
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
})