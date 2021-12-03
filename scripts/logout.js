import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

const logout = document.getElementById("logout");

logout.addEventListener('click', e =>{
    e.preventDefault();
    signOut(auth).then(()=>{
        //Log out successful.
        $('#nav-logout').hide();
        $('#nav-signin').show("fade", 1000);
        // location.reload()
    }).catch((error) =>{
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
    });
});