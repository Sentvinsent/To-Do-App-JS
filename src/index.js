import { renderTodo } from './views'
import { createTodo, loadTodos } from './todos';
import { setFilters } from './filters';

renderTodo();

//Add a task to the to do list
const addTask = (e) => {
    e.preventDefault();
    const inpVal = e.target.elements.addTaskInp.value.trim();
    if (inpVal.length > 0) {
        createTodo(inpVal);
        renderTodo();
        e.target.elements.addTaskInp.value = '';
    }
}

//Event handlers
document.getElementById('txt-filter').addEventListener('input', (e) => {
    setFilters({ searchText: e.target.value });
    renderTodo();
})

document.getElementById('add-task-form').addEventListener('submit', (e) => addTask(e))

document.getElementById('hide-comp-check').addEventListener('change', (e) => {
    setFilters({ hideCompleted: e.target.checked })
    renderTodo();
})

window.addEventListener('storage', (e) => {
    if (e.key === 'toDoList') {
        loadTodos();
        renderTodo()
    }
})