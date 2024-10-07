<script setup lang="ts">
import { useTodosStore } from '@/store/todos';
import { ref } from 'vue';

const newTodo = ref('');
const todoStore = useTodosStore();

const addTodo = () => {
  const currentNewTodo = newTodo.value;

  if (currentNewTodo.trim()) {
    todoStore.addTodo(newTodo.value)

    newTodo.value = '';
  }
};
</script>

<template>
    <v-form @submit.prevent="addTodo" class="w-25">
        <v-text-field
        v-model="newTodo"
        label="Введите задачу"
        clearable
        append-icon="mdi-plus"
        @click:append="addTodo"
        ></v-text-field>
    </v-form>
</template>