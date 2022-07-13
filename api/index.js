const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/get_todo_lists', (req, res) => {
    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/data/todoList.json');
    res.send(data);
});

module.exports = app;