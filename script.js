const createtaskbutton = document.querySelector('.taskbutton')
const taskarea = document.getElementById('taskarea')
const closemodal = document.querySelector('.close')
const savetask = document.getElementById('savetask')
const tasklist = document.getElementById('list')
const searchinput = document.getElementById('search')
const searchbutton = document.getElementById('searchbutton')

searchbutton.addEventListener('click', searchtask);
document.addEventListener('click', clearHighlights); // Add event listener to clear highlights

let taskarray = []

//open popup
createtaskbutton.addEventListener('click', function() {
    taskarea.style.display = "block";
})

closemodal.addEventListener('click', function(){
    taskarea.style.display="none";
})





savetask.addEventListener('click', addtask)

function addtask (){
     if(taskname === "" || deadline === "" || taskpriority==="") {
        alert("Please Enter all fields")
     }
    else{
      //collecting value

    const taskinput = document.getElementById('taskname')
    const taskname = taskinput.value.trim()
    const deadline = document.getElementById('deadline').value
    const taskpriority = document.getElementById('taskpriority').value

    //adding task to taskarray for search 
        if (taskinput){
            const task = {
                name: taskname,
                deadline:deadline,
                taskpriority:taskpriority
            }
            taskarray.push(task)
        }
    
    //creating element

    const li = document.createElement('li')
    li.textContent = taskname;
    
    const deadpara = document.createElement('p')
    deadpara.textContent = deadline;

    const priority = document.createElement('p')
    priority.textContent = taskpriority
    
    const deletebutton = document.createElement('button')
    deletebutton.textContent ="Delete"
    deletebutton.className = "delete-button"
    deletebutton.addEventListener('click', () => {
        tasklist.removeChild(li)
    })

    //on clicking li
    li.addEventListener('click', () => {
        li.classList.toggle("completed")
    })

    //adding in list
    
    li.appendChild(deadpara)
    li.appendChild(priority)
    tasklist.appendChild(li)
    li.appendChild(deletebutton)

    //clearing value 

    taskinput.value = "";
    document.getElementById('deadline').value = "";
    document.getElementById('taskpriority').value = 'low';
    
    }

    
}

//dark mode 
 const darkmode = document.getElementById('darkmode')
 darkmode.addEventListener('click', () => {
    const body = document.body
    body.classList.toggle("dark")
 })


 function displaytask(tasktodisplay) {
    tasklist.innerHTML = ''; // Clear the current task list
    tasktodisplay.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - Deadline: ${task.deadline} - Priority: ${task.taskpriority}`;
        tasklist.appendChild(li);
    });
}

//higlighting matching task

function higlighttask(tasks){
    const listItems =tasklist.getElementsByTagName('li')
    for(let item of listItems){
        const taskName = item.textContent.toLocaleLowerCase();
        if(tasks.some(task => task.name.toLocaleLowerCase()=== taskName))
            item.classList.add('highlight')
    }
}


//search function

function searchtask (){
    const searchvalue = searchinput.value.toLowerCase()
    const filterdtask = taskarray.filter(task => task.name.toLowerCase().includes(searchvalue));
    displaytask(filterdtask);
    higlighttask(filterdtask);
    searchinput.value = '';
}




// Clear highlights when clicking anywhere
function clearHighlights(event) {
    if (!searchinput.contains(event.target) && !searchbutton.contains(event.target)) {
        const highlightedItems = document.querySelectorAll('.highlight');
        highlightedItems.forEach(item => {
            item.classList.remove('highlight');
        });
    }
}







