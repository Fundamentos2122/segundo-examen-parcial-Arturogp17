const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const fecha = document.getElementById("fecha")
const tareas = document.getElementById("tareas")
const verTodo = document.getElementById("verTodo")

verTodo.addEventListener("change", saveDone);

let tareas_list = []
var formulario = document.getElementById("form-tareas");
formulario.addEventListener("submit", setTask);
var cont = 0;

readTasks(); 

function setTask(e){
    e.preventDefault();
    e.stopPropagation();

    console.log(titulo.value);
    console.log(descripcion.value);
    console.log(fecha.value);

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

    displayTasks();

    var json = localStorage.tasksCont;
    if(json != undefined){
        cont = JSON.parse(json);
    }
    else{
        cont = 0;
    }
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
    var html = "";
    for(var i = 0; i < tareas_list.length; i++)
    {
        if(verTodo.checked == true || tareas_list[i].done == false){
            html+=
            `
            <div>
                <div>
                <h3>${tareas_list[i].title}</h3> ${tareas_list[i].date}
                </div>
                <div>
                <text>${tareas_list[i].desc}</text>
                </div>
                <div>
            `
            if(tareas_list[i].done == false)
            {
            html += `
            <label><input type="checkbox" value="Completada">Completada</label>
            </div>
            </div>`;
            }
            else
            {
                html += `
                <label><input id=${tareas_list[i].id} type="checkbox" value="Completada" checked>Completada</label>`;
            }
            html += `
            </div>
            </div>`;
        }
    }
    tareas.innerHTML = html;
}

function saveDone(e)
{
    e.preventDefault();
    console.log("si entre pendejo");
    for(var i = 0; i < tareas_list.length; i++){
        if(tareas_list[i].id == this.id)
        {
            tareas_list[i].done = true;
            break;
        }
        
    }
    displayTasks();
}