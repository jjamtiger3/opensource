<template>
    <v-container>
        <v-row>
            <v-col>
                <h1> TodoList Page </h1>
            </v-col>
        </v-row>
        <add-todo></add-todo>
    </v-container>
</template>

<script>
import AddTodo from '../components/AddTodo.vue'
export default {
  components: { AddTodo },
  name: 'TodoListPage',
}
</script>

