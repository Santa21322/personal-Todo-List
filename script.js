const wrapper = document.querySelector('.wrapper');
const menuBtn = document.querySelector('.menu-btn');
const backBtn = document.querySelector('.back-btn')


const toggleScreen = () => {
    wrapper.classList.toggle('show-catagory');
}

menuBtn.addEventListener('click', toggleScreen)
backBtn.addEventListener('click', toggleScreen)


const addTaskBtn = document.querySelector('.add-task-btn');
const addTaskForm = document.querySelector('.add-task');
const blackBackdrop = document.querySelector('.black-backdrop');

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle('active');
    blackBackdrop.classList.toggle('active');
    addTaskBtn.classList.toggle('active');
};

addTaskBtn.addEventListener('click', toggleAddTaskForm);
blackBackdrop.addEventListener('click', toggleAddTaskForm);


// add catagories and tasks


let catagories = [
    { title: "education", img: "education.png" },
    { title: "work", img: "work.png" },
    { title: "personal", img: "personal.png" },
    { title: "fitness", img: "fitness.png" },
    { title: "home", img: "home.png" },
    { title: "finance", img: "finance.png" },
    { title: "health", img: "health.png" },
    { title: "travel", img: "travel.png" },
    { title: "hobby", img: "hobby.png" },
    { title: "entertainment", img: "entertainment.png" },
];


let tasks = [
    { id: 1, task: "Finish the Project", category: "work", completed: false },
    { id: 2, task: "Grocery Shopping", category: "personal", completed: false },
    { id: 3, task: "Team Meeting at 3 PM", category: "work", completed: true },
    { id: 4, task: "Workout for 30 Minutes", category: "fitness", completed: false },
    { id: 5, task: "Read 20 Pages of a Book", category: "education", completed: true },
    { id: 6, task: "Prepare Presentation Slides", category: "work", completed: false },
    { id: 7, task: "Fix Leaky Faucet", category: "home", completed: false },
    { id: 8, task: "Call Mom", category: "personal", completed: true },
    { id: 9, task: "Submit Expense Report", category: "finance", completed: false },
    { id: 10, task: "Practice Piano", category: "hobby", completed: false },
    { id: 11, task: "Organize Closet", category: "home", completed: false },
    { id: 12, task: "Attend Yoga Class", category: "fitness", completed: true },
    { id: 13, task: "Clean the Kitchen", category: "home", completed: false },
    { id: 14, task: "Complete JavaScript Assignment", category: "education", completed: false },
    { id: 15, task: "Schedule Dentist Appointment", category: "health", completed: true },
    { id: 16, task: "Pay Electricity Bill", category: "finance", completed: true },
    { id: 17, task: "Water the Plants", category: "home", completed: false },
    { id: 18, task: "Plan Weekend Trip", category: "travel", completed: false },
    { id: 19, task: "Learn 10 New Vocabulary Words", category: "education", completed: false },
    { id: 20, task: "Buy a Gift for Friend", category: "personal", completed: false },
    { id: 21, task: "Cook Dinner", category: "home", completed: true },
    { id: 22, task: "Meditate for 10 Minutes", category: "fitness", completed: false },
    { id: 23, task: "Backup Laptop Files", category: "work", completed: true },
    { id: 24, task: "Watch a Documentary", category: "entertainment", completed: true },
    { id: 25, task: "Write in Journal", category: "personal", completed: false },
];


let selectedCatagory = catagories[0];

const catagoriesContainer = document.querySelector(".catagories");
const catagoryTitle = document.querySelector(".catagory-title");
const catagoryTasksList = document.querySelector(".catagory-tasks-list");
const catagoryImg = document.querySelector("#catagory-img");
const totalTasks = document.querySelector(".totalTasks");
const tasksContainer = document.querySelector('.tasks');

const calculateTotal= () => {
    const catagoryTasks = tasks.filter(function(task){
        
           return task.category.toLowerCase() === selectedCatagory.title.toLowerCase();
        });
         catagoryTasksList.innerHTML = `${catagoryTasks.length} Tasks`;
         totalTasks.innerHTML = tasks.length;
}

const renderCatagories = () => {
    catagoriesContainer.innerHTML = "";
    catagories.forEach(function (catagory){
        // get all the tasks of current catagory
        const catagoryTasks = tasks.filter(function(task){
            return task.category.toLowerCase() === catagory.title.toLowerCase();
        });        
        
        // create a div to render catagory
        const div = document.createElement("div");
        div.classList.add("catagory");
        div.addEventListener('click', function (){
            wrapper.classList.add("show-catagory");
            selectedCatagory = catagory;
            catagoryTitle.innerHTML = catagory.title;
            catagoryImg.src = `./images/${catagory.img}`;
            calculateTotal();
            renderTasks();
        })
        div.innerHTML = `
        <div class="left">
        <img src="./images/${catagory.img}" alt="${catagory.title}">
        <div class="content">
        <h1>${catagory.title}</h1>
        <p>${catagoryTasks.length} Tasks</p>
        </div>
        </div>
        <div class="options">
        <div class="toggle-btn">
        fghj
        </div>
        </div>`
        
        catagoriesContainer.appendChild(div);
    })
}



const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const catagoryTasks = tasks.filter(function(task){
           return task.category.toLowerCase() === selectedCatagory.title.toLowerCase();
        });

        if(catagoryTasks.length === 0){
            tasksContainer.innerHTML = `
            <p class="no-task">No tasks for this catagory</p>`;
     }  else {
            catagoryTasks.forEach((task) => {
         
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label = document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked = task.completed;

    // checkbox functionality
    checkbox.addEventListener('change', () => {
    const index = tasks.findIndex((t) => t.id === task.id);
    tasks[index].completed = !tasks[index].completed;
    // save to local
    saveLocal();
})
            div.innerHTML = `  <div class="delete">
                            <i>delete</i>
                        </div>`
            
            label.innerHTML = ` <span class="checkmark">
                          <i>right</i>
                            </span>
                            <p>${task.task}</p>`

            label.prepend(checkbox);
            div.prepend(label);tasksContainer.appendChild(div);

        // delete functionality
        const deleteBtn = div.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            const index = tasks.findIndex((t) => t.id === task.id);

            // remove the clicked task
            tasks.splice(index, 1);
            saveLocal();
            renderTasks();
        })

            // div.innerHTML = `
            //  <label for="${task.id}" class="task">
            //         <input type="checkbox" name="" id="${task.id}" checked = ${task.completed}>
            //          <span class="checkmark" >
            //               <i>right</i>
            //                 </span>
            //                 <p>${task.task}</p>
            //             </label>
            //             <div class="delete">
            //                 <i>delete</i>
            //             </div>`
            //     tasksContainer.appendChild(div);
            //                     console.log(task);
            // add completion functionality on click checkbox
       
            });
            renderCatagories();
            calculateTotal();
        }
}

// save and get tasks from locl storage
const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"))
    
    if(localTasks){
        tasks = localTasks;
    }
}

// add new task functionality

// render all catagories in select
const catagorySelect = document.querySelector("#catagory-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener('click', toggleAddTaskForm);

addBtn.addEventListener('click', () => {
    const task = taskInput.value;
    const category = catagorySelect.value; 

    if(task === ""){
        alert("please enter a task");
    } else{
        const newTask = {
            id: tasks.length + 1,
            task,
            category,
            completed: false,
        }
    tasks.push(newTask);
    taskInput.value = "";
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
    }
})
catagories.forEach((catagory) => {
    const option = document.createElement("option");
    option.value = catagory.title.toLowerCase();
    option.textContent = catagory.title;
    catagorySelect.appendChild(option);
})

// saveLocal();
getLocal();
calculateTotal();
renderCatagories();
renderTasks();


