import app from "./index.js";
import {getFirestore, collection, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';

const db = getFirestore(app);
const Auth = getAuth();
const signupform = document.getElementById("signup-form");

//Sign up values.
// const saveuser = (name, l_name, email, uid, usertype) =>
//   addDoc(collection(db, "users"), {
//     name:name,
//     l_name:l_name,
//     email:email,
//     uid:uid,
//     usertype:usertype
//   });


signupform.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-name").value
  const userlname = document.getElementById("signup-lname").value
  const signupmail = document.getElementById("signup-email").value;
  const signuppassword = document.getElementById("signup-password").value;
  if (validate_email(signupmail) == false || validate_password(signuppassword) == false) {
    swal("Oops", "Email o contraseña no válido", "error")
    return
  }
    console.log("Llega");
    createUserWithEmailAndPassword(Auth, signupmail, signuppassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.displayName = username + " " +userlname;
      console.log(user);
      signupform.reset();
      // sendEmailVerification(Auth.currentUser)
      return setDoc(doc(db, "users", user.uid),{
        name: username,
        l_name: userlname,
        email: signupmail,
        usertype: 0
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
})



function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    //Email structure
    return true
  } else {
    //Its not an email
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}