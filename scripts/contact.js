import app from "./index.js";
import {
  getFirestore,
  collection,
  addDoc,
//   getDoc,
//   onSnapshot,
//   deleteDoc,
//   doc,
//   updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);
const taskform = document.getElementById("prod-form");
const nameform = document.getElementById("prod-title"); //Tasktitle
const l_nameform = document.getElementById("prod-description"); //tastdescr
const emailform = document.getElementById("image-link"); //imglink
const phoneform = document.getElementById("prod-stock"); //prodstock
const messageform = document.getElementById("prod-price"); //prodprice

let editstatus = false;
let id = "";

const saveform = (name, l_name, email, phone, message) =>
  addDoc(collection(db, "Contact-forms"), {
    name:name,
    l_name:l_name,
    email:email,
    phone:phone,
    message:message
  });

// const gettask = () => getDocs(collection(db, "videogames_items"));

// const onGetTask = (callback) =>
//   onSnapshot(collection(db, "videogames_items"), callback);

// const deleteTask = (id) => deleteDoc(doc(db, "videogames_items", id));

// const getTask = (id) => getDoc(doc(db, "videogames_items", id));

// const updateTask = (id, updatedTask) =>
//   updateDoc(doc(db, "videogames_items", id), updatedTask);

// window.addEventListener("DOMContentLoaded", async (e) => {
//   onGetTask((querySnapshot) => {
//     taskcontainer.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//       const task = doc.data();
//       task.id = doc.id;
//       taskcontainer.innerHTML += `<div class="card card-body mt-2 border-primary">
//         <h4>${task.title}</h4>
//         <p>${task.description}</p>
//         <h5 style="display:inline">Disponible: ${task.stockprod}</h5>
//         <h5>$${task.priceprod}</h5>
//         <div>
//           <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
//           <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
//         </div>
//       </div>`;

//       const btnDelete = document.querySelectorAll(".btn-delete");
//       btnDelete.forEach((btn) => {
//         btn.addEventListener("click", async (e) => {
//           await deleteTask(e.target.dataset.id);
//         });
//       });

//       const btnEdit = document.querySelectorAll(".btn-edit");
//       btnEdit.forEach((btn) => {
//         btn.addEventListener("click", async (e) => {
//           const doc = await getTask(e.target.dataset.id);
//           const task = doc.data();

//           editstatus = true;
//           id = doc.id;

//           document.getElementById("btn-task-form").innerText = "update";
//           document.getElementById("prod-title").value = task.title;
//           document.getElementById("prod-description").value = task.description;
//           document.getElementById("image-link").value = task.imagelink;
//           document.getElementById("prod-stock").value = task.stockprod;
//           document.getElementById("prod-price").value = task.priceprod;
//           document.getElementById("prod-title").scrollIntoView({
//             behavior: "smooth",
//             block: "center"
//           });
//           document.getElementById("prod-title").focus({
//             preventScroll: true
//           });
//         });
//       });
//     });
//   });
// });

taskform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameform.value;
  const l_name = l_nameform.value;
  const email = emailform.value;
  const phone = phoneform.value;
  const message = messageform.value;
  if (!editstatus) {
    await savetask(name, l_name, email, phone, message);
  }
//   } else {
//     await updateTask(id, {
//       title: title,
//       description: description,
//       imagelink: imagelink,
//       stockprod: stock,
//       priceprod: price
//     });
//     editstatus = false;
//     document.getElementById("btn-task-form").innerText = "save";
//     id = "";
//   }

  taskform.reset();
  tasktitle.focus();
});

// function findPos(obj) {
//   let curtop = 0;
//   if (obj.offsetParent) {
//       do {
//           curtop += obj.offsetTop;
//       } while (obj = obj.offsetParent);
//   return [curtop];
//   }
// }
