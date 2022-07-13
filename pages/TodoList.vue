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
        headers: []
    }
  },
  mounted() {
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
            value: 'deadline'
        },
        {
            text: '완료',
            align: 'start',
            sortable: true,
            value: 'done'
        }
    ];
    this.getTodoList();
  },
  methods: {
    getTodoList() {
        // const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        // return todoList;
        this.$axios.get('/get_todo_lists').then((res) => {
            this.todoList = res.data.todoList;
        });
    },
    addTodo(text, deadline) {
        let no = 1;
        const { todoList } = this;
        if (todoList.length > 0) {
            no = todoList[todoList.length - 1].no + 1;
        }
        const todo = {
            no, 
            text, 
            done: false,
            deadline
        };
        this.$axios.post('/add_todo', todo).then((res) => {
            this.todoList.push(todo);
        });

        // todoList.push({text, date, no});
        // localStorage.setItem('todoList', JSON.stringify(todoList));
        // this.todoList = todoList;
    },
    handleRowClick (row, data) {
        data.select(!data.isSelected);
    }
  }
}
</script>

