// functions to display current time
function currenDate() {
    const currentTimeEl = $('#time')
    const date = dayjs().format('MMM D, YYYY [at] HH:mm:ss a')
    currentTimeEl.text(date)
}
currenDate()
setInterval(currenDate, 1000);

// //variable

const addProjectBtn = $('#add-project-btn');

const projectNameInput = $('#project-name-input');

const projectTypesInput = $('#project-types');

const dueDateInput = $('#chosen-due-date');

const tableHeadEl = $('table-head')
const tableBodyEl = $('#table-body');

function renderTable(e) {
    e.preventDefault()

    const trEl = $('<tr>') // each project will have one 

    const tdName = $('<td>'); 
    tdName.text(projectNameInput.val().trim());

    const tdType = $('<td>');
    tdType.text(projectTypesInput.val());

    const tdDueDate = $('<td>');
    tdDueDate.text(dueDateInput.val())
    
    const tdButton = $('<td>');
    const doneButton = $('<button>')
    doneButton.text('X')

    tableHeadEl.append(tableBodyEl);
    tableBodyEl.append(trEl);
    trEl.append(tdName);
    trEl.append(tdType);
    trEl.append(tdDueDate);
    trEl.append(tdButton);
    tdButton.append(doneButton);
}

addProjectBtn.on('click', renderTable);