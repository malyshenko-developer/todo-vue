<script setup lang="ts">
import AddTodo from './components/AddTodo.vue';
import TodoItem from './components/TodoItem.vue';

</script>

<template>
  <v-app>
    <v-main>
      <v-container
        class="d-flex justify-center align-center flex-column"
        style="min-height: 100vh"
      >
        <h1 class="mb-5">
          To Do: Vite + Vue + Vuetify + Pinia + TypeScript
        </h1>
        <AddTodo />
        <v-list class="w-25" lines="two" height="400">
          <TodoItem />
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>
