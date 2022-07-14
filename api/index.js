const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const todoPath = __dirname + '/data/todoList.json';
const encoding = 'utf-8';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/get_todo_list', (req, res) => {
    const fs = require('fs');
    const data = fs.readFileSync(todoPath);
    res.send(data);
});

app.get('/get_todo/:id', (req, res) => {
  const fs = require('fs');
  const data = fs.readFileSync(todoPath, encoding);
  const id = parseInt(req.params.id);
  const json = JSON.parse(data);
  const filteredItem = json.filter((item) => {
    return item.no === id;
  });
  res.send(filteredItem);
})

app.post('/add_todo', (req, res) => {
    const fs = require('fs');
    const data = fs.readFileSync(todoPath, encoding);
    const json = JSON.parse(data);
    const body = req.body;
    json.push(body);
    console.log(json);
    fs.writeFile(todoPath, JSON.stringify(json), function(err) {
      res.send(200);
    });
});

app.post('/remove_todo', (req, res) => {
  const fs = require('fs');
  const data = fs.readFileSync(todoPath, encoding);
  const json = JSON.parse(data);
  const body = req.body;
  const removed_json = json.filter((item) => {
    return body.indexOf(item.no) < 0;
  });
  console.log(removed_json);
  fs.writeFile(todoPath, JSON.stringify(removed_json), function(err) {
    res.send(200);
  });
});


module.exports = app;
