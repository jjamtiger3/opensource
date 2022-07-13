<template>
    <v-container>
        <v-row>
            <v-col>
                <h1> TodoList Page </h1>
            </v-col>
        </v-row>
        <v-row>
          <v-col>
              <v-text-field v-model="input_todo" label="할일"></v-text-field>
          </v-col>
          <v-col>
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
                  v-model="date"
                  label="날짜선택"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'TodoListPage',
  data: () => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
  }),
}
</script>

