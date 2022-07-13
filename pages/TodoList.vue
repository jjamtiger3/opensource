<template>
    <v-container>
        <v-row>
            <v-col>
                <h1> TodoList Page </h1>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="todoList"
            :items-per-page="page_cnt"
            item-key="no"
            show-select
            class="elevation-1"
            @click:row="handleRowClick"
            >
        </v-data-table>
        <add-todo @addTodo="addTodo"></add-todo>
    </v-container>
</template>

<script>
import AddTodo from '../components/AddTodo.vue'
export default {
  components: { AddTodo },
  name: 'TodoListPage',
  data() {
    return {
        todoList: [],
        headers: [],
        page_cnt: 0
    }
  },
  mounted() {
    this.requestData();
  },
  methods: {
    async getTodoList() {
        // const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        // return todoList;
        const todoList = await this.$axios.get('/get_todo_lists');
        return todoList.data.todoList;
    },
    addTodo(text, date) {
        console.log(text, date);
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        let no = 1;
        if (todoList.length > 0) {
            no = todoList[todoList.length - 1].no + 1;
        }
        todoList.push({text, date, no});
        localStorage.setItem('todoList', JSON.stringify(todoList));
        this.todoList = todoList;
    },
    async requestData() {
        this.todoList = await this.getTodoList();
        this.headers = [
            {
                text: 'No',
                align: 'start',
                sortable: false,
                value: 'no'
            },
            {
                text: '할일',
                align: 'start',
                sortable: false,
                value: 'text'
            }, 
            {
                text: '기한',
                align: 'start',
                sortable: true,
                value: 'date'
            }
        ];
    },
    handleRowClick (row, data) {
        data.select(!data.isSelected);
    }
  }
}
</script>

