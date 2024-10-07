import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<Todo[]>([]);

    const loadTodosFromLocalStorage = () => {
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos) {
            todos.value = JSON.parse(savedTodos);
        }
    }

    const saveTodosToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(todos.value));
    }

    const addTodo = (text: string) => {
        todos.value.push({
            id: uuidv4(),
            text,
            completed: false
        })
    }

    const deleteTodo = (id: string) => {
        todos.value = todos.value.filter(todo => todo.id !== id);
    }

    const editTodo = (id: string, newText: string) => {
        const currentTodo = todos.value.find(todo => todo.id === id);

        if (currentTodo) {
            currentTodo.text = newText;
        }
    }

    const toggleCompletionTodo = (id: string) => {
        const currentTodo = todos.value.find(todo => todo.id === id);

        if (currentTodo) {
            currentTodo.completed = !currentTodo.completed;
        }
    }

    watch(todos, saveTodosToLocalStorage, { deep: true });

    loadTodosFromLocalStorage();

    return { todos, addTodo, deleteTodo, editTodo, toggleCompletionTodo }
})