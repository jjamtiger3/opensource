<v-container>
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-dialog
        v-model="this._editDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Item</span>
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
                    label="text"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.deadline"
                    label="deadline"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.done"
                    label="Done"
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
  <template v-slot:item.actions="{ item }">
    <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
  </template>
</v-container>
<script>
export default {
  name: "EditRow.vue",
  data () {
    return {
      _editDialog: false,
      _editedItem: {}
    }
  },
  watch: {
    _editDialog (val) {
      val || this.closeEditDialog();
    }
  },
  mounted() {
    this._editDialog = this.editDialog;
    this._editedItem = this.editedItem;
  },
  props: {
    editDialog: false,
    editedItem: {}
  },
  methods: {
    editItem (item) {
      this._editedItem = Object.assign({}, item);
      this._editDialog = true;
    },
    closeEditDialog() {
      this._editDialog = false;
      this._editedItem = {
        text: '',
        no: null,
        done: false,
        deadline: null
      };
    },
  }
}
</script>
