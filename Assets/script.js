// functions to display current time
function currenDate() {
    const currentTimeEl = $('#time')
    const date = dayjs().format('MMM D, YYYY [at] HH:mm:ss a')
    currentTimeEl.text(date)
}
setInterval(currenDate, 1000);

//variables
const addProjectBtn = $('#add-project-btn');

const projectNameInput = $('#project-name-input');
const projectTypesInput = $('#project-types');
const dueDateInput = $('#chosen-due-date');

const tableHeadEl = $('table-head');
const tableBodyEl = $('#table-body');


// uppon clicking, this function saves the user input to local storage
// as well as calls uppon renderTableRow to print user input to screen
function saveProject(e) {
    e.preventDefault();

    let newProject = {
        name: projectNameInput.val().trim(),
        type: projectTypesInput.val(),
        date: dueDateInput.val()
    }  

    //prints project to screen
    renderTableRow(newProject);

    // current projects, either equal to empty array, or filled
    let currentProjects = getSavedProjects();
    // adding onto the pre-existing local storage array
    currentProjects.push(newProject);
    // this will set to local storage the new info
    updateProjects(currentProjects);
}

function getSavedProjects() {
    let projects = localStorage.getItem('projects');

    if(projects === null){
        projects = [];
    } else {
        // returns the array of whatever was stringify-ed
        projects = JSON.parse(projects);
    }
    return projects
}

// takes in the new projects and sets item to local storage
function updateProjects(newProjects){
    localStorage.setItem("projects", JSON.stringify(newProjects));
}

function renderTableRow(project){
    const trEl = $('<tr>'); // each project will have one 
    const tdName = $('<td>'); 
    tdName.text(project.name);
    
    const tdType = $('<td>');
    tdType.text(project.type);
    
    const tdDueDate = $('<td>');
    tdDueDate.text(project.date);

    const TodayDate = dayjs().format('YYYY-MM-DD')

    if(project.date <= TodayDate ) {
        trEl.addClass('bg-danger')
    } else {
        trEl.addClass('bg-warning')
    }
    
    const tdButton = $('<td>');
    const doneButton = $('<button>');
    doneButton.text('X');
    doneButton.click(deleteProject);  //different way to write jquery event listener
    
    tableHeadEl.append(tableBodyEl);
    tableBodyEl.append(trEl);
    trEl.append(tdName);
    trEl.append(tdType);
    trEl.append(tdDueDate);
    trEl.append(tdButton);
    tdButton.append(doneButton);
}

function deleteProject(event){
    // console.log(event)
    // console.log(event.target)
    // console.log($(this))

    // Find the row (tr element) containing the delete button
    const row = $(event.target).closest('tr');

    // Find the project name from the first cell (td element) in the row
    const projectName = row.find('td:first').text();

    // Get the current projects from local storage
    let currentProjects = getSavedProjects();

    // Filter the current projects array to remove the project to be deleted
    currentProjects = currentProjects.filter((project) => project.name !== projectName);

    // Update the projects in local storage with the modified array
    updateProjects(currentProjects);

    // Remove the table row from the UI
    row.remove();
}

function hydrateTable(){
    let returnedProjects = getSavedProjects();
    
    if(returnedProjects.length === 0) {
        return
    } 
    
    for (let i=0; i < returnedProjects.length; i++) {
        renderTableRow(returnedProjects[i]);
    }
}

addProjectBtn.on('click', saveProject);

currenDate();
hydrateTable();