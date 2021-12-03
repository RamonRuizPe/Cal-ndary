import app from "./index.js";
import {
    getFirestore,
    getDoc,
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
    onSnapshot,
    collection
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
//Bring Firebase User Authentication
//import { getAuth, onAuthStateChanged } from "/firebase/auth";

//Get our Firebase project
const db = getFirestore(app);
const auth = getAuth();
const adminDiv = document.getElementById('admin');
const addAdmin = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().usertype)
    if(docSnap.data().usertype == 1){
        $('#admin').show('slow');
    }
}
window.addEventListener('DOMContentLoaded', async(e) =>{
    onAuthStateChanged(auth, async(user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          addAdmin(uid);
        }
});
});
