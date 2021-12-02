import app from "./index.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);
const agendayear = document.getElementById("agenda-year");
const prevmonth = document.getElementById("prev-month");
const nextmonth = document.getElementById("next-month");
const days = document.getElementById("days");
const daycontent = document.getElementById("day-content");
let date_changes = new Date();
let btnSubmit = document.querySelectorAll(".btn-submit");;

let editstatus = false;
let id = "";

const agendaform = (uid, day, task, hin, hend) =>
  addDoc(collection(db, "agenda"), {
    uid:uid,
    day:day,
    task:task,
    hin:hin,
    hend:hend
  });

//Firestore functions

const onGetTask = (callback) =>
  onSnapshot(collection(db, "agenda"), callback);

const deleteTask = (id) => deleteDoc(doc(db, "agenda", id));

const getTask = (id) => getDoc(doc(db, "agenda", id));

const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "agenda", id), updatedTask);


//Webpage behaviour and agenda gen
prevmonth.addEventListener('click', () => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 0){
            date_changes.setMonth(date_changes.getMonth() - 1);
            getDaysArray(date_changes.getFullYear() - 1, 12);
            //ReInit due to its destruction to get another month carousel. 
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
              // date_changes.setFullYear(date_changes.getFullYear() - 1);
              
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth());
            //ReInit due to its destruction to get another month carousel.
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
            
            date_changes.setMonth(date_changes.getMonth() - 1);
        }
    $(".loader-wrapper").fadeOut("slow");
});
    
nextmonth.addEventListener('click', async (e) => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 11){
            date_changes.setMonth(date_changes.getMonth() + 1);
             getDaysArray(date_changes.getFullYear(), 1);
            //ReInit due to its destruction to get another month carousel. 
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
            // date_changes.setFullYear(date_changes.getFullYear() + 1);
            console.log(date_changes.getFullYear(), date_changes.getMonth());
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth() + 2);
            //ReInit due to its destruction to get another month carousel.
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
    
            date_changes.setMonth(date_changes.getMonth() + 1);
            console.log(date_changes.getMonth());
        }
    $(".loader-wrapper").fadeOut("slow");
}); 


const getDaysArray = (function() {
    const divmonth = document.getElementById("months");
    const weekdays = Object.freeze([ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ]);
    return (year, month) => {
      days.innerHTML = "";
      daycontent.innerHTML = "";
      const monthIndex = month - 1;
      const date = new Date(year, monthIndex, 1);
      const result = [];
      agendayear.innerHTML = `Tu agenda ${year}`;
      divmonth.innerHTML = `<h1 class="text-center">${getMonthName(monthIndex).toUpperCase()}</h1>`;
      prevmonth.innerHTML = `<a href="#" class="a-month"><i class="fas fa-chevron-left"></i> ${getMonthName(monthIndex - 1).toUpperCase()}</a>`;
      nextmonth.innerHTML = `<a href="#" class="a-month">${getMonthName(monthIndex + 1).toUpperCase()} <i class="fas fa-chevron-right"></i></a>`;
      while (date.getMonth() == monthIndex) {
        // result.push(`${date.getDate()}-${names[date.getDay()]}`);
        days.innerHTML += `
                        <div class="text-center btn-contact rounded mx-2">
                        <button id="-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}" class="btn agenda-day" type="button" data-toggle="collapse" data-target="#a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}" aria-expanded="false" aria-controls="a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                            <h2>${date.getDate()}<h2>
                            <h5>${weekdays[date.getDay()]}</h5>
                        </button>
                        </div>`
        daycontent.innerHTML += `
                            <div class="collapse" id="a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                              <div class="card card-body">
                                <div class="row justify-content-start">
                                  <div class="col-4">
                                    <h5>HORA</H5>
                                  </div>
                                  <div class="col-4">
                                    <h5>TAREA</H5>
                                  </div>
                                </div>
                                <div class="row justify-content-start show-content mb-3" id="show-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                </div>
                                  <button type="button" class="btn btn-contact text-white" data-toggle="modal" data-target="#modal-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                    Agregar actividades
                                  </button>
                              </div>
                              <div class="modal fade" id="modal-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                  <div class="modal-content text-white">
                                    <div class="modal-header bg-darkblue border-bottom-0">
                                      <h5 class="modal-title" id="exampleModalLabel">Introduce tu actividad</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body bg-darkblue">
                                      <form id="form-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                        <div class="form-group">
                                          <label class="ls text-uppercase">¿Cuál es la actividad?</label>
                                          <input type="text" class="form-control input-border-bottom rounded" id="tk-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}" name="name" placeholder="Actividad" required="required">
                                        </div>
                                        <p class="mt-2">¿Cuánto tiempo para la actividad?</p>
                                        <div class="container">
                                          <div class="row">
                                            <div class="col-2">
                                              <h4>Inicio</h4>
                                            </div>
                                            <div class="col-3">
                                                <select class="custom-select" id="h-in-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                  <option id="h-in-0" value="0">0</option>
                                                  <option id="h-in-1" value="1">1</option>
                                                  <option id="h-in-2" value="2">2</option>
                                                  <option id="h-in-3" value="3">3</option>
                                                  <option id="h-in-4" value="4">4</option>
                                                  <option id="h-in-5" value="5">5</option>
                                                  <option id="h-in-6" value="6">6</option>
                                                  <option id="h-in-7" value="7">7</option>
                                                  <option id="h-in-8" value="8">8</option>
                                                  <option id="h-in-9" value="9">9</option>
                                                  <option id="h-in-10" value="10">10</option>
                                                  <option id="h-in-11" value="11">11</option>
                                                  <option id="h-in-12" value="12">12</option>
                                                </select>
                                            </div>
                                            <div class="col-1">
                                            <h2 class="text-center">:</h2>
                                            </div>
                                            <div class="col-3">
                                                <select class="custom-select d-inline" id="min-in-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                  <option id="min-in-0" value="00">00</option>
                                                  <option id="min-in-1" value="1">1</option>
                                                  <option id="min-in-2" value="2">2</option>
                                                  <option id="min-in-3" value="3">3</option>
                                                  <option id="min-in-4" value="4">4</option>
                                                  <option id="min-in-5" value="5">5</option>
                                                  <option id="min-in-6" value="6">6</option>
                                                  <option id="min-in-7" value="7">7</option>
                                                  <option id="min-in-8" value="8">8</option>
                                                  <option id="min-in-9" value="9">9</option>
                                                  <option id="min-in-10" value="10">10</option>
                                                  <option id="min-in-11" value="11">11</option>
                                                  <option id="min-in-12" value="12">12</option>
                                                  <option id="min-in-13" value="13">13</option>
                                                  <option id="min-in-14" value="14">14</option>
                                                  <option id="min-in-15" value="15">15</option>
                                                  <option id="min-in-16" value="16">16</option>
                                                  <option id="min-in-17" value="17">17</option>
                                                  <option id="min-in-18" value="18">18</option>
                                                  <option id="min-in-19" value="19">19</option>
                                                  <option id="min-in-20" value="20">20</option>
                                                  <option id="min-in-21" value="21">21</option>
                                                  <option id="min-in-22" value="22">22</option>
                                                  <option id="min-in-23" value="23">23</option>
                                                  <option id="min-in-24" value="24">24</option>
                                                  <option id="min-in-25" value="25">25</option>
                                                  <option id="min-in-26" value="26">26</option>
                                                  <option id="min-in-27" value="27">27</option>
                                                  <option id="min-in-28" value="28">28</option>
                                                  <option id="min-in-29" value="29">29</option>
                                                  <option id="min-in-30" value="30">30</option>
                                                  <option id="min-in-31" value="31">31</option>
                                                  <option id="min-in-32" value="32">32</option>
                                                  <option id="min-in-33" value="33">33</option>
                                                  <option id="min-in-34" value="34">34</option>
                                                  <option id="min-in-35" value="35">35</option>
                                                  <option id="min-in-36" value="36">36</option>
                                                  <option id="min-in-37" value="37">37</option>
                                                  <option id="min-in-38" value="38">38</option>
                                                  <option id="min-in-39" value="39">39</option>
                                                  <option id="min-in-40" value="40">40</option>
                                                  <option id="min-in-41" value="41">41</option>
                                                  <option id="min-in-42" value="42">42</option>
                                                  <option id="min-in-43" value="43">43</option>
                                                  <option id="min-in-44" value="44">44</option>
                                                  <option id="min-in-45" value="45">45</option>
                                                  <option id="min-in-46" value="46">46</option>
                                                  <option id="min-in-47" value="47">47</option>
                                                  <option id="min-in-48" value="48">48</option>
                                                  <option id="min-in-49" value="49">49</option>
                                                  <option id="min-in-50" value="50">50</option>
                                                  <option id="min-in-51" value="51">51</option>
                                                  <option id="min-in-52" value="52">52</option>
                                                  <option id="min-in-53" value="53">53</option>
                                                  <option id="min-in-54" value="54">54</option>
                                                  <option id="min-in-55" value="55">55</option>
                                                  <option id="min-in-56" value="56">56</option>
                                                  <option id="min-in-57" value="57">57</option>
                                                  <option id="min-in-58" value="58">58</option>
                                                  <option id="min-in-59" value="59">59</option>
                                                </select>                                              
                                            </div>
                                            <div class="col-3">
                                              <select class="custom-select" id="in-time-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                <option id="in-am">am</option>
                                                <option id="in-pm">pm</option>
                                              </select>
                                            </div>

                                            <div class="col-2">
                                              <h4>Fin</h4>
                                            </div>
                                            <div class="col-3">
                                                <select class="custom-select" id="h-end-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                  <option id="h-end-0" value="0">0</option>
                                                  <option id="h-end-1" value="1">1</option>
                                                  <option id="h-end-2" value="2">2</option>
                                                  <option id="h-end-3" value="3">3</option>
                                                  <option id="h-end-4" value="4">4</option>
                                                  <option id="h-end-5" value="5">5</option>
                                                  <option id="h-end-6" value="6">6</option>
                                                  <option id="h-end-7" value="7">7</option>
                                                  <option id="h-end-8" value="8">8</option>
                                                  <option id="h-end-9" value="9">9</option>
                                                  <option id="h-end-10" value="10">10</option>
                                                  <option id="h-end-11" value="11">11</option>
                                                  <option id="h-end-12" value="12">12</option>
                                                </select>
                                            </div>
                                            <div class="col-1">
                                            <h2 class="text-center">:</h2>
                                            </div>
                                            <div class="col-3">
                                                <select class="custom-select d-inline" id="min-end-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                  <option id="min-end-0" value="00">00</option>
                                                  <option id="min-end-1" value="1">1</option>
                                                  <option id="min-end-2" value="2">2</option>
                                                  <option id="min-end-3" value="3">3</option>
                                                  <option id="min-end-4" value="4">4</option>
                                                  <option id="min-end-5" value="5">5</option>
                                                  <option id="min-end-6" value="6">6</option>
                                                  <option id="min-end-7" value="7">7</option>
                                                  <option id="min-end-8" value="8">8</option>
                                                  <option id="min-end-9" value="9">9</option>
                                                  <option id="min-end-10" value="10">10</option>
                                                  <option id="min-end-11" value="11">11</option>
                                                  <option id="min-end-12" value="12">12</option>
                                                  <option id="min-end-13" value="13">13</option>
                                                  <option id="min-end-14" value="14">14</option>
                                                  <option id="min-end-15" value="15">15</option>
                                                  <option id="min-end-16" value="16">16</option>
                                                  <option id="min-end-17" value="17">17</option>
                                                  <option id="min-end-18" value="18">18</option>
                                                  <option id="min-end-19" value="19">19</option>
                                                  <option id="min-end-20" value="20">20</option>
                                                  <option id="min-end-21" value="21">21</option>
                                                  <option id="min-end-22" value="22">22</option>
                                                  <option id="min-end-23" value="23">23</option>
                                                  <option id="min-end-24" value="24">24</option>
                                                  <option id="min-end-25" value="25">25</option>
                                                  <option id="min-end-26" value="26">26</option>
                                                  <option id="min-end-27" value="27">27</option>
                                                  <option id="min-end-28" value="28">28</option>
                                                  <option id="min-end-29" value="29">29</option>
                                                  <option id="min-end-30" value="30">30</option>
                                                  <option id="min-end-31" value="31">31</option>
                                                  <option id="min-end-32" value="32">32</option>
                                                  <option id="min-end-33" value="33">33</option>
                                                  <option id="min-end-34" value="34">34</option>
                                                  <option id="min-end-35" value="35">35</option>
                                                  <option id="min-end-36" value="36">36</option>
                                                  <option id="min-end-37" value="37">37</option>
                                                  <option id="min-end-38" value="38">38</option>
                                                  <option id="min-end-39" value="39">39</option>
                                                  <option id="min-end-40" value="40">40</option>
                                                  <option id="min-end-41" value="41">41</option>
                                                  <option id="min-end-42" value="42">42</option>
                                                  <option id="min-end-43" value="43">43</option>
                                                  <option id="min-end-44" value="44">44</option>
                                                  <option id="min-end-45" value="45">45</option>
                                                  <option id="min-end-46" value="46">46</option>
                                                  <option id="min-end-47" value="47">47</option>
                                                  <option id="min-end-48" value="48">48</option>
                                                  <option id="min-end-49" value="49">49</option>
                                                  <option id="min-end-50" value="50">50</option>
                                                  <option id="min-end-51" value="51">51</option>
                                                  <option id="min-end-52" value="52">52</option>
                                                  <option id="min-end-53" value="53">53</option>
                                                  <option id="min-end-54" value="54">54</option>
                                                  <option id="min-end-55" value="55">55</option>
                                                  <option id="min-end-56" value="56">56</option>
                                                  <option id="min-end-57" value="57">57</option>
                                                  <option id="min-end-58" value="58">58</option>
                                                  <option id="min-end-59" value="59">59</option>
                                                </select>                                              
                                            </div>
                                            <div class="col-3">
                                              <select class="custom-select" id="end-time-${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                                                <option id="end-am">am</option>
                                                <option id="end-pm">pm</option>
                                              </select>
                                            </div>

                                          </div>
                                        </div>
                                        <div class="text-right mt-2">
                                          <button type="button" class="btn btn-contact text-white" data-dismiss="modal">Cancelar</button>
                                          <button type="submit" class="btn btn-primary btn-submit" data-id="${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">Guardar</button>
                                        </div>
                                      </form>
                                    </div>                                    
                                  </div>
                                </div>
                              </div>
                            </div>`
      
      date.setDate(date.getDate() + 1);
      }
      btnSubmit = document.querySelectorAll(".btn-submit");
      return result;
    }
  })();

const getMonthName = (function() {
    /** Empleada en la función de días, por ello no se resta uno al mes para el índice del arreglo **/
    const months = Object.freeze(["enero", "febrero", "marzo", 
    "abril","mayo" , "junio", "julio", "agosto", "septiembre", "octubre", 
    "noviembre", "diciembre"]);
    return (month) => {
        if(month == 12){
            return months[0] + " " + (date_changes.getFullYear() + 1);
        }
        else if(month == -1){
            return months[11] + " " + (date_changes.getFullYear() - 1);
        }
        return months[month];
    }
})();

// let array = getDaysArray(2021,11);

$(document).ready(function(){
    $('#days').slick({
        slidesToShow: 7,
        slidesToScroll: 7,
        // focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });
  });

//Let the calendar change when clicking other days.
let $myGroup = $('#day-content');
$myGroup.on('show.bs.collapse','.collapse', function() {
    $myGroup.find('.collapse.show').collapse('hide');
});

//Set the month in which it runs. Webpage starting values
window.addEventListener("DOMContentLoaded", async (e) => {
  $(".loader-wrapper").show();
  getDaysArray(new Date().getFullYear(), new Date().getMonth() + 1);
  $(".loader-wrapper").fadeOut("slow");
  const content = document.getElementsByClassName("show-content");

  btnSubmit.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const day_id = e.target.dataset.id;
      // console.log(e.target.dataset.id);
      const scheduleform = document.getElementById(`form-${day_id}`)
      const taskname_form = document.getElementById(`tk-${day_id}`);
      const h_in_form = document.getElementById(`h-in-${day_id}`);
      const min_in_form = document.getElementById(`min-in-${day_id}`);
      const in_time_form = document.getElementById(`in-time-${day_id}`);
      const h_end_form = document.getElementById(`h-end-${day_id}`);
      const min_end_form = document.getElementById(`min-end-${day_id}`);
      const end_time_form = document.getElementById(`end-time-${day_id}`);
      const h_start = h_in_form.value + ":" + min_in_form.value + " " + in_time_form.value;
      const h_end = h_end_form.value + ":" + min_end_form.value + " " + end_time_form.value;
      // console.log(taskname_form.value);
      // console.log(h_start, h_end);
      await agendaform(0, day_id, taskname_form.value, h_start, h_end);
      scheduleform.reset();
      $(`#modal-${day_id}`).modal('hide');
    });
  });

  onGetTask((querySnapshot) => {
    // console.log(btnSubmit);
    for (let i = 0; i < content.length; i++){
      content[i].innerHTML = "";
    }
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      // console.log(task);
      // console.log(task.day);
      const showtask = document.getElementById(`show-${task.day}`);
      // console.log(showtask);
      showtask.innerHTML += `
                            <div class="col-4 border-bottom border-dark">
                              <h3>${task.task}
                            </div>
                            <div class="col-4 border-bottom border-dark">
                             <h3>${task.hin} - ${task.hend}</h3>
                            </div>
                            <div class="col-4 border-bottom border-dark">
                            </div>
      `
    });
  });

  $("#days").on('click','button', function(event){
    let id_ = $(this).attr('id');
    // console.log(id_);
  })

});

//Firebase stuff


