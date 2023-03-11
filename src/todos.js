import { v4 as uuidv4 } from 'uuid';

let toDo = []

//Check notes in the local storage
const loadTodos = () => {
    const toDoJSON = localStorage.getItem('toDoList');
    try {
        toDo =  toDoJSON ? JSON.parse(toDoJSON) : [];
    } catch {
        toDo = []
    }
}
loadTodos();
const getTodos = () => toDo

//Save notes to local storage
const saveTodos = () => {
    localStorage.setItem('toDoList', JSON.stringify(toDo));
}

const createTodo = (toDoTxt) => {
    toDo.push({
        _id: uuidv4(),
        task: toDoTxt,
        completed: false
    })
    saveTodos()
}


const removeTodo = (id) => {
    const taskIndex = toDo.findIndex((task) => task._id === id);
    if (taskIndex > -1) {
        toDo.splice(taskIndex, 1);
        saveTodos();
    }
}

const toggleTodo = (id) => {
    const task = toDo.find((task) => task._id === id);
    if (task) {
        task.completed = !task.completed
        saveTodos();
    }
}

export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }