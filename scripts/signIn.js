import app from "./index.js";
import {getFirestore, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const db = getFirestore(app);
const Auth = getAuth();
const signinform = document.getElementById("signin-form");

signinform.addEventListener('submit', e =>{
    e.preventDefault();
    const signinmail = document.getElementById("signin-email").value;
    const signinpassword = document.getElementById("signin-password").value;
    const address = signinmail.split('@').pop();
    signInWithEmailAndPassword(Auth,signinmail,signinpassword)
    .then( async () => {
        
        // Signed in
        const user = Auth.currentUser;
        console.log(address)

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().usertype)
        if(docSnap.data().usertype == 0)
        {
          if (address == "up.edu.mx" && user.emailVerified == true){
            return updateDoc(doc(db, "users", user.uid), {
              usertype : 1
            });
          }
        }
        
        // console.log(user);
        // ...
      })
      .then(() => {
        signinform.reset();
        $('#signin').modal('hide');
        
        //Assign alert to user
        const user = Auth.currentUser;
        const name = user.displayName;
        console.log(user);
        swal(`¡Hola ${name}!`, {
          buttons: false,
          timer: 1000,
        });

        $('#nav-signin').hide();
        $('#nav-logout').show("fade", 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
})