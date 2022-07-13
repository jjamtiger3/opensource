const express = require('express');
const app = express();

app.get('/get_todo_lists', (req, res) => {
    console.log('todolist');
});

module.exports = app;