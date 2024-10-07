<script setup lang="ts">
import { useTodosStore } from '@/store/todos';
import { computed, ref } from 'vue';

const editTodoId = ref<string | null>(null);
const editedText = ref('');

const todoStore = useTodosStore();

const removeTodo = (id: string) => {
    todoStore.deleteTodo(id);
};

const startEditing = (id: string, currentText: string) => {
    editTodoId.value = id;
    editedText.value = currentText;
}

const closeEditing = () => {
    editTodoId.value = null;
    editedText.value = '';
}

const saveEditing = (id: string) => {
    if (editedText.value.trim()) {
        todoStore.editTodo(id, editedText.value);
        closeEditing();
    }
}

const toggleCompletion = (id: string) => {
    todoStore.toggleCompletionTodo(id);
}

const isEditing = computed(() => (id: string) => editTodoId.value === id);
</script>

<template>
    <v-list-item
        v-for="todo in todoStore.todos"
        :key="todo.id"
    >
        <template v-slot:prepend v-if="!isEditing(todo.id)">
            <v-checkbox-btn
                v-model:model-value="todo.completed"
                @click="toggleCompletion(todo.id)"
            />
        </template>
        <v-text-field
            v-model="editedText"
            label="Редактировать задачу"
            @keyup.enter="saveEditing(todo.id)"
            @blur="saveEditing(todo.id)"
            autofocus
            v-if="isEditing(todo.id)"
        />
        <v-list-item-title :class="{ 'text-decoration-line-through': todo.completed }" v-else>
            {{ todo.text }}
        </v-list-item-title>
        <template v-slot:append v-if="isEditing(todo.id)">
            <v-btn
                icon="mdi-pencil-outline"
                variant="text"
                @click="saveEditing(todo.id)"
            ></v-btn>
        </template>
        <template v-slot:append v-else>
            <v-btn
                icon="mdi-pencil"
                variant="text"
                @click="startEditing(todo.id, todo.text)"
            ></v-btn>
            <v-btn
                icon="mdi-delete-forever"
                variant="text"
                @click="removeTodo(todo.id)"
            ></v-btn>
        </template>
    </v-list-item>
</template>