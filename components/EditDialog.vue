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
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="changeDateFormat"
                          label="날짜선택"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="changeDateFormat"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
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
  data: () => ({
    dialog: false,
    menu: false,
    editedItem: {
      text: '',
      no: null,
      deadline: null,
      done: false
    }
  }),
  computed: {
    changeDateFormat: {
      get() {
        return new Date(this.editedItem.deadline - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
      },
      set(value) {
        this.editedItem.deadline = new Date(value);
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close();
    }
  },

  methods: {
    editItem (item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close () {
      this.editedItem = {
        text: '',
        no: null,
        deadline: null,
        done: false
      };
      this.dialog = false;
    },

    save () {
      this.$emit('editSaved', this.editedItem);
      this.close();
    }
  },
}
</script>
