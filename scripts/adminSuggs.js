import app from "./index.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);

/* Usuarios */
const usersContainer = document.getElementById("users-container")

const onGetUser = (callback) => onSnapshot(collection(db, "users"), callback);
const deleteUser = (id) => deleteDoc(doc(db, "users", id));

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUser((querySnapshot) => {
    usersContainer.innerHTML = "";
    let aux = 0;
    querySnapshot.forEach((doc) => {
      aux++;
      const user = doc.data();
      user.id = doc.id;

      usersContainer.innerHTML += `<div class="card userBox" style="width: 18rem;">
      <div class="card-body userCard">
        <p class="numUser">Usuario ${aux}</p>
        <h5 class="card-title nameTitle">${user.name} ${user.l_name}</h5>
        <p class="card-text">Correo: ${user.email}</p>
        <button id="clearBtn" class="btn-clear" data-id="${user.id}"></button>
      </div>
    </div>`;
    
      const clearBtn = document.querySelectorAll(".btn-clear");
      clearBtn.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteMesg(e.target.dataset.id)
        })
      })

    });
  })
})

/*Preferencias */

// const savePreference = (preference) =>{
//   const userPreferences= doc(db, "users", uid);
//   updateDoc(userPreferences,{
//       preferences: arrayUnion({preferencia: preference}),
//   });
// }

// const savePreferences =  document.getElementById("savePreferences");

// savePreferences.addEventListener('submit', async (e) =>{
//   e.preventDefault();
//   let choices = [];
//   const els = document.querySelectorAll(".preference-btn");
//   console.log(els);
//   for (let i = 0; i < els.length; i++){
//     if (els[i].checked){
//       choices.push(els[i].value);
//     }
//   }
// });

/*videogameBtn.addEventListener("click", e => {
  e.preventDefault()
  document.getElementsById("videogamesBtn").classList.add("btnSelected")
})

document.getElementById("videogamesBtn").addEventListener("click", function(){
  this.classList.add("btnSelected")
})*/

/*Sugerencias */
const suggestForm = document.getElementById("sugg-form")
const videogamesContainer = document.getElementById("videogames-container")
const readingContainer = document.getElementById("reading-container")
const sportsContainer = document.getElementById("sports-container")
const artContainer = document.getElementById("art-container")
const photographyContainer = document.getElementById("photography-container")
const techContainer = document.getElementById("tech-container")
const astrologyContainer = document.getElementById("astrology-container")
const animeContainer = document.getElementById("anime-container")

let editStatus = false;
let id = "";

const getSugg = (id) => getDoc(doc(db, "suggestions", id));
const onGetSugg = (callback) => onSnapshot(collection(db, "suggestions"), callback);
const deleteSugg = (id) => deleteDoc(doc(db, "suggestions", id));

const updateSugg = (id, updatedSugg) =>
  updateDoc(doc(db, "suggestions", id), updatedSugg);

const saveSugg = (title, description, category, date) => {
    addDoc(collection(db, "suggestions"), {
        title,
        description,
        category,
        date
    })
}

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetSugg((querySnapshot) => {
        videogamesContainer.innerHTML = "";
        readingContainer.innerHTML = "";
        sportsContainer.innerHTML = "";
        artContainer.innerHTML = "";
        photographyContainer.innerHTML = "";
        techContainer.innerHTML = "";
        astrologyContainer.innerHTML = "";
        animeContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const sugg = doc.data();
            sugg.id = doc.id;
            if (sugg.category === "Videojuegos") {
                videogamesContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if  (sugg.category === "Lectura") {
                readingContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Deportes") {
                sportsContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Arte") {
                artContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Fotografía") {
                photographyContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Tecnología") {
                techContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Astrología") {
                astrologyContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            else {
                animeContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${new Date(sugg.date)}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                  <button class="btn btn-secondary btn-edit" data-id="${sugg.id}">Edit</button>
                </div>
              </div>`;
            }
            
            const deleteBtn = document.querySelectorAll(".btn-clear");
            deleteBtn.forEach((btn) => {
              btn.addEventListener("click", async (e) => {
                await deleteSugg(e.target.dataset.id)
              })
            })

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach((btn) => {
              btn.addEventListener("click", async (e) => {
                const doc = await getSugg(e.target.dataset.id);
                const sugg = doc.data();

                editStatus = true;
                id = doc.id;

                suggestForm["sugg-title"].value = sugg.title;
                suggestForm["sugg-description"].value = sugg.description;
                suggestForm["sugg-category"].value = sugg.category;
                suggestForm["btn-sugg-form"].innerText = "Update";
             });
            });
        })
    })
})

suggestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = suggestForm["sugg-title"];
    const description = suggestForm["sugg-description"];
    const category = suggestForm["sugg-category"]

    if (!editStatus) {
      await saveSugg(title.value, description.value, category.value, new Date().getTime());
    } else {
      await updateSugg(id, {
        title: title.value,
        description: description.value,
        category: category.value,
        date : new Date().getTime()
      });
  
      editStatus = false;
      id = "";
      suggestForm["btn-task-form"].innerText = "Save";
      suggestForm.reset();
    }
    /*await saveSugg(title.value, description.value, category.value, new Date().getTime());*/

    suggestForm.reset();
    title.focus();
});