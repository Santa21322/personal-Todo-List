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

const catagoriesContainer = document.querySelector('.catagories');

const renderCatagories = () => {
    
}