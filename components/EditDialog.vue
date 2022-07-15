    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">수정하기</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.text"
                      label="Text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-checkbox
                      v-model="editedItem.done"
                      label="Done"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.deadline"
                      label="DeadLine"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
<script>
export default {
  props: {
    todoList: []
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    _headers: [],
    _todoList: [],
    editedIndex: -1,
    editedItem: {
      text: '',
      no: null,
      deadline: null,
      done: false
    },
    defaultItem: {
      text: '',
      no: null,
      deadline: null,
      done: false
    }
  }),

  watch: {
    dialog (val) {
      val || this.close();
    }
  },

  created () {
    this.initialize();
  },

  methods: {
    initialize () {
      this._todoList = this.todoList;
    },

    editItem (item) {
      this.editedIndex = this._todoList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this._todoList[this.editedIndex], this.editedItem);
      } else {
        this._todoList.push(this.editedItem);
      }
      this.close();
    },
  },
}
</script>
