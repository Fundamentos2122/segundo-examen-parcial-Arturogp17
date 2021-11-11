const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const fecha = document.getElementById("fecha")
const tareas = document.getElementById("tareas")
const verTodo = document.getElementById("verTodo")
verTodo.addEventListener("change", displayTasks);

let tareas_list = []
var formulario = document.getElementById("form-tareas");
formulario.addEventListener("submit", setTask);
var cont;

readTasks(); 

function setTask(e){
    if(cont == null){
        cont = 0;
    }
    e.preventDefault();
    e.stopPropagation();

    if(titulo.value != "")
    {
        var task ={
            id: cont,
            title: titulo.value,
            desc: descripcion.value,
            date: fecha.value,
            done: false
        }
        cont++;
        titulo.value = "";
        descripcion.value = "";
        tareas_list.push(task);
        saveTasks();
    }
}

function readTasks(){
    var json = localStorage.tasks;
    if(json != undefined){
        tareas_list = JSON.parse(json);
    }
    else{
        tareas_list = [];
    }
    var json = localStorage.tasksCont;
    if(json != undefined){
        cont = JSON.parse(json);
    }
    else{
        cont = 0;
    }
    displayTasks();
}

function deleteTask(id){

    tareas_list = tareas_list.filter(task => task.id != id);
    saveTasks();
}

function saveTasks(){
    var json = JSON.stringify(tareas_list);
    localStorage.setItem("tasks", json);
    localStorage.setItem("tasksCont", cont);
    displayTasks();
}

function displayTasks(){
    
    console.log("cont", cont)
    var html = "";
    for(var i = 0; i < tareas_list.length; i++)
    {
        if(verTodo.checked == true || tareas_list[i].done == false){
            
            html+=
            `<div`;
            if(tareas_list[i].done == true)
            {
                html+= ` style="background-color: green;"`;
            }
            html+=`>
                <hr>
                <div>
                <h2>${tareas_list[i].title}</h2> ${tareas_list[i].date}
                </div>
                <div>
                <text>${tareas_list[i].desc}</text>
                </div>
                <div>
            `
            if(tareas_list[i].done == false)
            {
            html += `
            <label><input id="Check_${tareas_list[i].id}" type="checkbox" value="Completada">Completada</label>`;
            }
            else
            {
                html += `
                <label><input id="Check_${tareas_list[i].id}" type="checkbox" value="Completada" checked>Completada</label>`;
            }
            html += `
            </div>
            </div>`;
        }
        tareas.innerHTML = html;
        console.log(html);
        console.log("id","Check_" + tareas_list[i].id)
        var taskDone = document.getElementById("Check_" + tareas_list[i].id)
        if(taskDone != null){
            taskDone.addEventListener("change", saveDone);
        }
    }
    
}

function saveDone(e)
{
    e.preventDefault();
    for(var i = 0; i < tareas_list.length; i++){
        console.log(this.id)
        if("Check_" + tareas_list[i].id == this.id)
        {
            console.log("encontre uno");
            tareas_list[i].done = this.checked;
            break;
        }
    }
    saveTasks();
}