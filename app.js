const addBtn = document.querySelector(".input-todo button");
const inputBox = document.querySelector(".input-todo input");
const todoList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".info-box button");



inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;

    if(userEnteredValue.trim() != 0){
        addBtn.classList.add("active")
    }else {
        addBtn.classList.remove("active")
    }
}

addBtn.addEventListener('click' , function(){
    let userEnteredValue = inputBox.value;

    const getLocalStorageData = JSON.parse(localStorage.getItem('todo')) || [];
    getLocalStorageData.push(userEnteredValue)

    localStorage.setItem('todo' , JSON.stringify(getLocalStorageData))

    showTasks()
    addBtn.classList.remove("active")
})


showTasks()
function showTasks(){
    let getLocalStorageData = localStorage.getItem('todo')
    
    if(getLocalStorageData == null){
        listArray = [];
    }else {
        listArray = JSON.parse(getLocalStorageData)
    }

    const pendingTasksNumb = document.querySelector(".pendingTasks")
    pendingTasksNumb.textContent = listArray.length;

    if(listArray.length > 0){
        console.log("hihihi");
        deleteAllBtn.classList.add("active")
    }else {
        deleteAllBtn.classList.remove("active")
    }
    
    let newTag = "";
    listArray.forEach((element,index) => {
        newTag += `<li>${element}<span class="icon"><i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i></span></li>`
    })
    
    todoList.innerHTML = newTag;
    inputBox.value=""
}

function deleteTask(index){
    const getLocalStorageData = JSON.parse(localStorage.getItem('todo')) || [];
    const updatedTasks = getLocalStorageData.filter((_,i) => i !== index)
    localStorage.setItem('todo' , JSON.stringify(updatedTasks))
    showTasks()
}

deleteAllBtn.addEventListener('click' , function(){
    localStorage.removeItem('todo');
    showTasks()
})