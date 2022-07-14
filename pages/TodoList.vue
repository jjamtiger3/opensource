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
            :items-per-page="5"
            :footer-props="footerProps"
            @item-selected="handleRowData"
            @toggle-select-all="handleAllData"
            show-select
            class="elevation-1"
            @click:row="handleRowClick"
            >
        </v-data-table>
        <todo @addTodo="addTodo" @removeTodo="removeTodo"></todo>
    </v-container>
</template>

<script>
import Todo from '../components/Todo.vue'
export default {
  components: { Todo },
  name: 'TodoListPage',
  data() {
    return {
        todoList: [],
        headers: [],
        selectedRows: [],
        footerProps: {
          'items-per-page-options': [5, 10, 20, -1]
        }
    }
  },
  mounted() {
    // TODO 기한이 yyyy-MM-dd로 나오도록
    // ADD구현 (완)

    // REMOVE구현
    // -> 쓰래기통 아이콘 구현(완)
    // -> add옆 쓰래기통 구현(완)
    // -> 현재 선택된 행의 no를 출력(완)
    // -> multirow 선택후 삭제 -> 쓰래기통 구현(완)
    // -> 체크박스 체크시 선택이 정상동작안함(완)

    // UPDATE구현
    // -> 완료여부가 체크박스로 나오도록
    // -> 할일 클릭시 input나오도록
    // -> 기한 클릭시 datepicker나오도록
    // -> 완료여부 클릭시 checkbox 나오도록

    // 기타
    // deadline이 3일이내로 남은 경우 경고표시 -> warning icon띄우면될듯
    // 공통함수 만들어야 할듯
    // page-per-count 5 / 10 / 20 으로 설정 (완)
    // 우측상단에 검색기능 추가 -> filteredItem넣어야할것 -> todoList대신 filteredTodoList추가
    // https://vuetifyjs.com/en/components/data-tables/#custom-filter 검색은 여기 참고
    // API명 변경 -> add_todo -> api/add_todo
    // TODO에서 엔터치면 입력되도록
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
            this.todoList = res.data;
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
    removeTodo() {
      // 선택된 행이 있는지 여부 체크
      // no를 보내 삭제
      this.selectedRows.sort();
      this.$axios.post('/remove_todo', this.selectedRows).then((res) => {
        this.todoList = this.todoList.filter((item) => {
          return this.selectedRows.indexOf(item.no) < 0;
        });
        this.selectedRows = [];
      });
    },
    handleRowData (data) {
      if (data.value !== undefined) {
        const index = this.selectedRows.indexOf(data.item.no);
        if (data.value) {
          this.selectedRows.push(data.item.no);
        } else {
          this.selectedRows.splice(index, 1);
        }
      }
    },
    handleAllData (data) {
      this.selectedRows = data.items.map(item => item.no);
    },
    handleRowClick (row, data) {
        data.select(!data.isSelected);
        const index = this.selectedRows.indexOf(data.item.no);
        if (index < 0) {
          this.selectedRows.push(data.item.no);
        } else {
          this.selectedRows.splice(index, 1);
        }
    }
  }
}
</script>

