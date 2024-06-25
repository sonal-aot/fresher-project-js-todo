
function loadTask() {

    function createTask(title, description, duedate) {
        let mydata = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = {
            id: Date.now(),
            title: title,
            description: description,
            duedate: duedate,
            completed: false
        };

        mydata.push(task);
        localStorage.setItem('tasks', JSON.stringify(mydata));
        renderTasks();
    }


    function createTaskElement(task) {

        const taskItem = document.createElement('li');
        taskItem.className = 'task';


        const leftSide = document.createElement('div');
        leftSide.className = 'left-side';


        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'chk-box form-check';
        checkbox.name = 'checkbox';
        checkbox.id = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            task.completed = checkbox.checked;
            updateTaskStatus(task.id, task.completed);
        });


        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';


        const taskHead = document.createElement('div');
        taskHead.className = 'task-head';


        const taskTitle = document.createElement('span');
        taskTitle.className = 'task-title';
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;


        const pendingIcon = document.createElement('img');
        pendingIcon.src = 'images/pending-icon.svg';
        pendingIcon.alt = 'pending-signal';


        taskHead.appendChild(taskTitle);
        taskHead.appendChild(pendingIcon);


        const taskDescription = document.createElement('p');
        taskDescription.className = 'task-description';
        taskDescription.id = 'task-description';
        taskDescription.textContent = task.description;


        const taskCal = document.createElement('div');
        taskCal.className = 'task-cal';


        const calendarIcon = document.createElement('img');
        calendarIcon.src = 'images/calendar-icon.svg';
        calendarIcon.alt = 'calendar-icon';


        const taskDate = document.createElement('span');
        taskDate.className = 'task-date';
        taskDate.textContent = `by ${task.duedate}`;


        taskCal.appendChild(calendarIcon);
        taskCal.appendChild(taskDate);


        taskContent.appendChild(taskHead);
        taskContent.appendChild(taskDescription);
        taskContent.appendChild(taskCal);


        leftSide.appendChild(checkbox);
        leftSide.appendChild(taskContent);


        const editDeleteIcons = document.createElement('div');
        editDeleteIcons.className = 'edit-delete-icons';


        const editButton = document.createElement('button');
        editButton.className = 'btn-edit';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#editModal');
        editButton.onclick = function () { editTask(task.id); };


        const editIcon = document.createElement('img');
        editIcon.src = 'images/edit-icon.svg';
        editIcon.alt = 'edit-icon';


        editButton.appendChild(editIcon);


        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-edit';
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        deleteButton.setAttribute('data-bs-target', '#deleteModal');
        deleteButton.onclick = function () { deleteTask(task.id); };


        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/trash-icon.svg';
        deleteIcon.alt = 'trash-icon';


        deleteButton.appendChild(deleteIcon);


        editDeleteIcons.appendChild(editButton);
        editDeleteIcons.appendChild(deleteButton);


        taskItem.appendChild(leftSide);
        taskItem.appendChild(editDeleteIcons);


        if (task.completed) {
            pendingIcon.src = 'images/completed-icon.svg';
        }

        return taskItem;
    }


    function updateTaskStatus(taskId, completed) {
        let mydata = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = mydata.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            mydata[taskIndex].completed = completed;
            localStorage.setItem('tasks', JSON.stringify(mydata));
            renderTasks();
        }
    }


    function renderTasks() {
        const activeTaskList = document.getElementById('active-task');
        const completedTaskList = document.getElementById('completed-task');
        activeTaskList.innerHTML = '';
        completedTaskList.innerHTML = '';

        const mydata = JSON.parse(localStorage.getItem("tasks")) || [];
        mydata.forEach(task => {
            const taskElement = createTaskElement(task);
            if (task.completed) {
                completedTaskList.appendChild(taskElement);
            } else {
                activeTaskList.appendChild(taskElement);

            }

        });

    }


    let taskform = document.querySelector('#task-form');
    taskform.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('task-name').value;
        const description = document.getElementById('task-text').value;
        const duedate = document.getElementById('task-due-date').value;

        createTask(title, description, duedate);
        this.reset();
    });


    renderTasks();

    function editTask(taskId) {
        let editModal = document.querySelector('#editModal');
        let mydata = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = mydata.findIndex(task => task.id === taskId);

        document.getElementById('edit-task-name').value = mydata[taskIndex].title;
        document.getElementById('edit-task-text').value = mydata[taskIndex].description;
        document.getElementById('edit-task-due-date').value = mydata[taskIndex].duedate;


        editModal.addEventListener('submit', function (event) {
            event.preventDefault();


            let edittitle = document.getElementById('edit-task-name').value;
            let editdescription = document.getElementById('edit-task-text').value;
            let editduedate = document.getElementById('edit-task-due-date').value;


            mydata[taskIndex].title = edittitle;
            mydata[taskIndex].description = editdescription;
            mydata[taskIndex].duedate = editduedate;


            localStorage.setItem('tasks', JSON.stringify(mydata));
            renderTasks();
        })
    }


    function deleteTask(taskId) {
        let deleteModal = document.querySelector('#deleteModal');
        let mydata = JSON.parse(localStorage.getItem("tasks")) || [];
    
        deleteModal.addEventListener('submit', function(event) {
            
            
            event.preventDefault();
            mydata = mydata.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(mydata));
    
            
            renderTasks();
        }, { once: true }); 
    }
    


}



