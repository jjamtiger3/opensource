<template>
    <v-container>
        <v-row>
            <v-col>
                <h1> TodoList Page </h1>
            </v-col>
            <v-col>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="검색"
                single-line
                hide-details
                @blur="onBlur"
              ></v-text-field>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="todoList"
            item-key="no"
            :items-per-page="5"
            :footer-props="footerProps"
            :search="search"
            @item-selected="handleRowData"
            @toggle-select-all="handleAllData"
            show-select
            class="elevation-1"
            @click:row="handleRowClick"
            >
            <template v-slot:item.deadline="{ item }">
              <v-chip
                :color="getDate(item)"
                dark
              >
                {{ changeDateFormat(item.deadline) }}
              </v-chip>
            </template>
            <template v-slot:item.done="{ item }">
              <v-simple-checkbox
                v-model="item.done"
                disabled
                @input="handleChecked"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
        </v-data-table>
        <todo @addTodo="addTodo" @removeTodo="removeTodo"></todo>
        <edit-dialog ref="editDialog" @editSaved="save"></edit-dialog>
    </v-container>
</template>

<script>
import Todo from '../components/Todo.vue';
import EditDialog from "../components/EditDialog";
export default {
  components: { Todo, EditDialog },
  name: 'TodoListPage',
  data() {
    return {
        todoList: [],
        headers: [],
        search: '',
        selectedRows: [],
        apiPath: '/api/todos',
        footerProps: {
          'items-per-page-options': [5, 10, 20, -1]
        }
    }
  },
  mounted() {
    // TODO 기한이 yyyy-MM-dd로 나오도록(완)

    // READ
    // 전체 리스트 조회 (완)
    // 개별항목 조회 (완)

    // CREATE구현 (완)

    // DELETE구현
    // -> 쓰래기통 아이콘 구현(완)
    // -> add옆 쓰래기통 구현(완)
    // -> 현재 선택된 행의 no를 출력(완)
    // -> multirow 선택후 삭제 -> 쓰래기통 구현(완)
    // -> 체크박스 체크시 선택이 정상동작안함(완)

    // UPDATE구현
    // -> 완료여부가 체크박스로 나오도록(완)
    // -> 수정폼을 따로 만들어서 행 클릭시 수정폼에 데이터가 출력되도록 (완)
    // -> 수정폼에서 저장버튼 클릭시 데이터 저장 (완)

    // 기타
    // deadline이 3일이내로 남은 경우 경고표시 -> warning icon띄우면될듯(완)
    // page-per-count 5 / 10 / 20 으로 설정 (완)
    // 우측상단에 검색기능 추가 -> filteredItem넣어야할것 -> todoList대신 filteredTodoList추가(완)
    // https://vuetifyjs.com/en/components/data-tables/#custom-filter 검색은 여기 참고
    // API명 변경 -> add_todo -> api/add_todo
    // TODO에서 엔터치면 입력되도록(완)
    // 검색필더 로컬스토리지에 저장(완)
    this.headers = [
      {
          text: 'No',
          sortable: false,
          value: 'no'
      },
      {
          text: '할일',
          sortable: false,
          value: 'text'
      },
      {
          text: '기한',
          sortable: true,
          value: 'deadline'
      },
      {
          text: '완료',
          sortable: true,
          value: 'done'
      },
      {
          text: 'actions',
          value: 'actions',
          sortable: false
      }
    ];
    this.getTodoList();
    this.search = localStorage.getItem('searchWord') || '';
  },
  methods: {
    getTodoList() {
        this.$axios.get(this.apiPath).then((res) => {
          if (res.status === 200) {
            this.todoList = res.data;
          }
        }, (rej) => {
          this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        });
    },
    getTodo(no) {
        this.$axios.get(`${this.apiPath}/${no}`).then((res) => {
          console.log(res.data);
        }, (rej) => {
          const todos = JSON.parse(localStorage.getItem('todoList')) || [];
          const todo = todos.filter(todo => todo.no === no)[0];
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
        this.$axios.post(this.apiPath, todo).then((res) => {
            this.todoList.push(todo);
        }, (rej) => {
            const todos = JSON.parse(localStorage.getItem('todoList')) || [];
            todos.push(todo);
            localStorage.setItem('todoList', JSON.stringify(todos));
        });
    },
    removeTodo() {
      this.selectedRows.sort();
      this.$axios.post(`${this.apiPath}/delete`, this.selectedRows).then((res) => {
        _removeTodo(this);
      }, (rej) => {
        _removeTodo(this);
        localStorage.setItem('todoList', JSON.stringify(todos));
      });
      function _removeTodo (self) {
        self.todoList = self.todoList.filter((item) => {
          return self.selectedRows.indexOf(item.no) < 0;
        });
        self.selectedRows = [];
      }
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
    handleChecked (event) {
      console.log(event);
    },
    handleRowClick (row, data) {
        // data.select(!data.isSelected);
        // const index = this.selectedRows.indexOf(data.item.no);
        // if (index < 0) {
        //   this.selectedRows.push(data.item.no);
        // } else {
        //   this.selectedRows.splice(index, 1);
        // }
    },
    getDate (item) {
      const current = new Date().getTime();
      const { deadline, done } = item
      const deadlineTime = new Date(deadline).getTime();
      const diff = Math.ceil((deadlineTime - current) / (1000 * 60 * 60 * 24));
      let color = '';
      if (diff < 0) {
        color = 'red';
      } else if (diff >= 0 && diff <= 3) {
        color = 'orange';
      }
      if (done) {
        color = 'green';
      }
      return color;
    },
    changeDateFormat (date) {
      return new Date(date).toISOString().substring(0, 10);
    },
    onBlur () {
      localStorage.setItem('searchWord', this.search);
    },
    editItem (item) {
      this.$refs.editDialog.editItem(item);
    },
    save (item) {
      // TODO
      // 1. API구현
      // 2. 데이터 전송
      // 3. 응답오면 저장
      this.$axios.put(`${this.apiPath}/${item.no}`, item).then((res) => {
          _saveItem(this.todoList, item.no);
      }, (rej) => {
          _saveItem(this.todoList, item.no);
          localStorage.setItem('todoList', JSON.stringify(this.todoList));
      });

      function _saveItem (todoList, no) {
        let itemIndex = 0;
        todoList.forEach((todo, index) => {
          if (todo.no === no) {
            itemIndex = index;
            return false;
          }
        });
        todoList.splice(itemIndex, 1, item);
      }
    }
  }
}
</script>

