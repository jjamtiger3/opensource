<template>
    <v-container>
        <v-row>
            <v-col>
                <h1> TodoList Page </h1>
            </v-col>
        </v-row>
        <add-todo @addTodo="addTodo"></add-todo>
    </v-container>
</template>

<script>
import AddTodo from '../components/AddTodo.vue'
export default {
  components: { AddTodo },
  name: 'TodoListPage',
  methods: {
    getTodoList() {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    },
    addTodo(text, date) {
        console.log(text, date);
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        todoList.push({text, date});
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
}
</script>

