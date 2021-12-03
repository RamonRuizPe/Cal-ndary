//Bring Firebase Firestore
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
// import { getAuth, onAuthStateChanged } from "/firebase/auth";

//Get our Firebase project
const db = getFirestore(app);

//Get User ID
const auth = getAuth();


//Elements on Monday
const taskForm = document.querySelector('.task-form-lunes');
const newTaskLunes = document.querySelector('#newtask input');
const tasksLunes = document.querySelector('#tasks');
const taskFormMartes = document.querySelector('.task-form-martes');
const newTaskMartes = document.querySelector('#newtaskMartes input');
const tasksMartes = document.querySelector('#tasksMartes');
const taskFormMiercoles = document.querySelector('.task-form-miercoles');
const newTaskMiercoles = document.querySelector('#newtaskMiercoles input');
const tasksMiercoles = document.querySelector('#tasksMiercoles');
const taskFormJueves = document.querySelector('.task-form-jueves');
const newTaskJueves = document.querySelector('#newtaskJueves input');
const tasksJueves = document.querySelector('#tasksJueves');
const taskFormViernes = document.querySelector('.task-form-viernes');
const newTaskViernes = document.querySelector('#newtaskViernes input');
const tasksViernes = document.querySelector('#tasksViernes');
const taskFormFin = document.querySelector('.task-form-fin');
const newTaskFin = document.querySelector('#newtaskFin input');
const tasksFin = document.querySelector('#tasksFin');
//Load Tasks
const getTasks = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
    {
        console.log("Document data:", docSnap.data());
    } 
    else 
    {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    for(let i=0; i<docSnap.data().tasks.length; i++)
    {
        if(docSnap.data().tasks[i].dia == 'lunes'){
            tasksLunes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        if(docSnap.data().tasks[i].dia == 'martes'){
            tasksMartes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        if(docSnap.data().tasks[i].dia == 'miércoles'){
            tasksMiercoles.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        if(docSnap.data().tasks[i].dia == 'jueves'){
            tasksJueves.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        if(docSnap.data().tasks[i].dia == 'viernes'){
            tasksViernes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        if(docSnap.data().tasks[i].dia == 'fin de semana'){
            tasksFin.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${docSnap.data().tasks[i].objetivo}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;
        }
        
    }   
}
   
//Create task
const saveTask = (task,day,uid) =>{
    const userTasks= doc(db, "users", uid);
    updateDoc(userTasks,{
        tasks: arrayUnion({dia: day, objetivo: task}),
    });
}
//Delete Task
const deleteTask = (task,day,uid) =>{
    const userTasks = doc (db, "users", uid);
    updateDoc(userTasks,{
        tasks: arrayRemove({dia: day, objetivo: task}),
    });
}
window.addEventListener('DOMContentLoaded', async(e) =>{
    
    onAuthStateChanged(auth, async(user) => {
        if (user) {
          const uid = user.uid;
          await getTasks(uid);
          $(".loader-wrapper").fadeOut("slow");
          const current_tasks_1 = document.querySelectorAll('.delete');
        console.log(current_tasks_1)
        for(let i=0; i<current_tasks_1.length; i++){
            current_tasks_1[i].addEventListener('click', e=> {
                const day = current_tasks_1[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks_1[i].parentNode.remove();
                deleteTask(current_tasks_1[i].parentElement.textContent.trim(),day,uid);
            });
        }
    }
});
});
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      taskForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskLunes.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskLunes.value,"lunes",uid);
            tasksLunes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskLunes.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtask input").value = "";
    });
    
    taskFormMartes.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskMartes.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskMartes.value,"martes",uid);
            tasksMartes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskMartes.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtaskMartes input").value = "";
    });
    
    taskFormMiercoles.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskMiercoles.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskMiercoles.value,"miércoles",uid);
            tasksMiercoles.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskMiercoles.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtaskMiercoles input").value = "";
    });
    
    taskFormJueves.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskJueves.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskJueves.value,"jueves",uid);
            tasksJueves.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskJueves.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtaskJueves input").value = "";
    });
    
    taskFormViernes.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskViernes.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskViernes.value,"viernes",uid);
            tasksViernes.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskViernes.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase();
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtaskViernes input").value = "";
    });
    
    taskFormFin.addEventListener('submit', async(e) => {
        e.preventDefault();
        if(newTaskFin.value.length == 0){
            swal("Por favor, inserta un objetivo");
        }
        else{
            saveTask(newTaskFin.value,"fin de semana",uid);
            tasksFin.innerHTML += `
            <div class="task">
                <span class='taskname' id="taskname">
                    ${newTaskFin.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            `;    
        }
        
        const current_tasks = document.querySelectorAll('.delete');
        console.log(current_tasks[0]);
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].addEventListener('click', async(e)=>{
                const day = current_tasks[i].parentNode.parentNode.parentNode.parentElement.firstElementChild.textContent.toLowerCase(); 
                console.log('entre a borrar fin');
                current_tasks[i].parentNode.remove();
                deleteTask(current_tasks[i].parentElement.textContent.trim(),day,uid)
            });
        }
    
    // let tasks = document.querySelectorAll(".task");
    //     for(var i=0; i<tasks.length; i++){
    //         tasks[i].onclick = function(){
    //             this.classList.toggle('completed');
    //         }
    //     }
        document.querySelector("#newtaskFin input").value = "";
    });
}
  });

  


