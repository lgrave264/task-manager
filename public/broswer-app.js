const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskIbputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
//load tasks from api/tasks
const showTasks = async() => {
    loadingDOM.getElementsByClassName.visibility = "visible"
    try{
        const{ data:{tasks},} = await axios.get("/api/v1/tasks")
        if(tasks.length < 1){
            tasksDOM.innerHTML = '<h5 class="empty-list">No Tasks in your List</h5>'
            loadingDOM.getElementsByClassName.visibility = "hidden"
            return;
        }
        const allTasks = tasks.map((task) => {
            const{completed, _id:taskID, name}= task;
            return `<div class="single-task" ${completed && "task-completed"}"><h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            <a href="task.html?id=${taskID}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"</i>
            </button>
            </div>
            </div>`;
        }).join("");tasksDOM.innerHTML= allTasks;
    }catch(error){
        tasksDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again later...${error}</h5>`
    }
    loadingDOM.getElementsByClassName.visibility = "hidden"
};

showTasks()

//delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e)=>{
    const el = e.target;
    if(el.parentElement.classList.contains("delete-btn")){
        loadingDOM.style.visibility = "visible"
        const id = el.parentElement.dataset.id
        try{
            await axios.delete(`/api/tasks/${id}`);
            showTasks();
        } catch(error){
            console.log(error)
        }
    }
    loadingDOM.style.visibility = "hidden"
})

//form
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value

    try{
        await axios.post('/api/v1/tasks',{name});
        showTasks();
        taskInputDOM.value=""
        formAlertDOM.style.display="block"
        formAlertDOM.textContent = "Success, task added"
        formAlertDOM.classList.add("text-success")
    }catch(error){
        formAlertDOM.style.display="block"
        formAlertDOM.innerHTML="Error PLease Try Again"
    }
    setTimeout(()=>{
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove("text-success")
    },3000)
})