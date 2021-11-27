function checklist (day){
    if (day == 'lunes'){
        document.querySelector('.js-form').addEventListener('submit', e => {
            if(document.querySelector('#newtask input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasks').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtask input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtask input").value = "";
        }
        });
    }
    if(day == 'martes'){
        document.querySelector('.js-form-martes').addEventListener('submit', e => {
            if(document.querySelector('#newtaskMartes input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasksMartes').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtaskMartes input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtaskMartes input").value = "";
        }
        });
    }
    if(day == 'miercoles'){
        document.querySelector('.js-form-miercoles').addEventListener('submit', e => {
            if(document.querySelector('#newtaskMiercoles input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasksMiercoles').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtaskMiercoles input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtaskMiercoles input").value = "";
        }
        });
    }
    if(day == 'jueves'){
        document.querySelector('.js-form-jueves').addEventListener('submit', e => {
            if(document.querySelector('#newtaskJueves input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasksJueves').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtaskJueves input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtaskJueves input").value = "";
        }
        });

    }
    if(day == 'viernes'){
        document.querySelector('.js-form-viernes').addEventListener('submit', e => {
            if(document.querySelector('#newtaskViernes input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasksViernes').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtaskViernes input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtaskViernes input").value = "";
        }
        });
    }
    if(day == 'fin'){
        document.querySelector('.js-form-fin').addEventListener('submit', e => {
            if(document.querySelector('#newtaskFin input').value.length == 0){
                alert("Por favor, añade un objetivo")
            }
            else{
                document.querySelector('#tasksFin').innerHTML += `
                    <div class="task">
                        <span id="taskname">
                            ${document.querySelector('#newtaskFin input').value}
                        </span>
                        <button class="delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
        
                var current_tasks = document.querySelectorAll(".delete");
                for(var i=0; i<current_tasks.length; i++){
                    current_tasks[i].onclick = function(){
                        this.parentNode.remove();
                    }
                }
        
                var tasks = document.querySelectorAll(".task");
                for(var i=0; i<tasks.length; i++){
                    tasks[i].onclick = function(){
                        this.classList.toggle('completed');
                    }
                }
        
                document.querySelector("#newtaskFin input").value = "";
        }
        });
    }
}

checklist('lunes');
checklist('martes');
checklist('miercoles');
checklist('jueves');
checklist('viernes');
checklist('fin');