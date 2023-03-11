import { getTodos, removeTodo, toggleTodo } from "./todos";
import { getFilters } from "./filters";

//Render the to do list
const renderTodo = () => {
    const todoDiv = document.getElementById('to-do-list');
    const list = getTodos();
    const { searchText, hideCompleted } = getFilters();
    const incompleteTasks = list.filter((task) => !task.completed);

    let filteredList = list.filter((task) => {
        const textMatchFilter = task.task.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        const hideCompletedFilter = !hideCompleted || !task.completed;
        return textMatchFilter && hideCompletedFilter;
    })

    todoDiv.innerHTML = "";
    if (filteredList.length > 0) {
        todoDiv.appendChild(generateSummaryDOM(incompleteTasks));
        filteredList.forEach((task, index) => {
            todoDiv.appendChild(generateTodoDOM(task, index));
        })
    } else {
        const emptyMsg = document.createElement('p');
        emptyMsg.classList.add('empty-message');
        emptyMsg.textContent = 'No tasks to do';
        todoDiv.appendChild(emptyMsg);
    }
}

//Generate the to do list task DOM

const generateTodoDOM = (task, index) => {
    //create elemets: div, checkbox, text and button
    const taskEl = document.createElement('label');
    taskEl.classList.add('list-item');
    const containerEl = document.createElement('div');
    containerEl.classList.add('list-item__container');
    const checkbox = document.createElement('input');
    const newP = document.createElement('span');
    const button = document.createElement('button');



    //Working with checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (e) => {
        toggleTodo(task._id)
        renderTodo();
    })

    //working with text
    newP.textContent = `Task ${index + 1}: ${task.task}`;

    //working with button
    button.textContent = 'Remove';
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
        removeTodo(task._id);
        renderTodo();
    })

    //append elements
    taskEl.appendChild(containerEl)
    containerEl.appendChild(checkbox);
    containerEl.appendChild(newP);
    taskEl.appendChild(button);

    return taskEl
}

//Generate the to do list summary DOM
const generateSummaryDOM = () => {
    const summary = document.createElement('p');
    summary.classList.add('list-title');
    const list = getTodos();
    const ending = list.length === 1 ? '' : 's'

    summary.textContent = `You have ${list.length} task${ending} to do`

    return summary
}

export { generateTodoDOM, generateSummaryDOM, renderTodo }