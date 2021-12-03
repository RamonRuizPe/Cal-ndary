import app from "./index.js";
import{
    getFirestore,
    getDoc,
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth();

const savePreference = (preference, uid) =>{
    const userPreferences= doc(db, "users", uid);
    updateDoc(userPreferences,{
        preferences: preference,
    });
  }
  
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const prefForm = document.getElementById("pref-form");
        prefForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let choices = [];
            const els = document.querySelectorAll(".preference-btn");
            console.log(els);
            for (let i = 0; i < els.length; i++) {
                if (els[i].checked) {
                    choices.push(els[i].value);
                }
            }
            if (choices.length > 3) {
                swal("Oops", "Selecciona máximo 3 opciones por favor", "error")
                return
            }
            await savePreference(choices, uid);
        });
    }
});