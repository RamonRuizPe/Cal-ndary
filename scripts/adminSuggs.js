import app from "./index.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc
  //   updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);
const suggestForm = document.getElementById("sugg-form")
const videogamesContainer = document.getElementById("videogames-container")
const readingContainer = document.getElementById("reading-container")
const sportsContainer = document.getElementById("sports-container")
const artContainer = document.getElementById("art-container")
const photographyContainer = document.getElementById("photography-container")
const techContainer = document.getElementById("tech-container")
const astrologyContainer = document.getElementById("astrology-container")
const animeContainer = document.getElementById("anime-container")

const onGetSugg = (callback) => onSnapshot(collection(db, "suggestions"), callback);
const deleteSugg = (id) => deleteDoc(doc(db, "suggestions", id));


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
                </div>
              </div>`;
            }
            else if  (sugg.category === "Lectura") {
                readingContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Deportes") {
                sportsContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Arte") {
                artContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Fotografía") {
                photographyContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Tecnología") {
                techContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-delete" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else if (sugg.category === "Astrología") {
                astrologyContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }
            else {
                animeContainer.innerHTML += `<div class="card suggBox" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${sugg.title}</h5>
                  <p class="card-text">Descripción: ${sugg.description}</p>
                  <p class="card-text">Fecha: ${sugg.category}</p>
                  <button class="btn-clear" data-id="${sugg.id}"></button>
                </div>
              </div>`;
            }

            const deleteBtn = document.querySelectorAll(".btn-clear");
            deleteBtn.forEach((btn) => {
              btn.addEventListener("click", async (e) => {
                await deleteSugg(e.target.dataset.id)
              })
            })
        })
    })
})

suggestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = suggestForm["sugg-title"];
    const description = suggestForm["sugg-description"];
    const category = suggestForm["sugg-category"]
  
    await saveSugg(title.value, description.value, category.value, new Date().getTime());

    suggestForm.reset();
    title.focus();
});