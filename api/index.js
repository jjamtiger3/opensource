const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const todoPath = __dirname + '/data/todoList.json';
const encoding = 'utf-8';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/todos', (req, res) => {
    const fs = require('fs');
    const data = fs.readFileSync(todoPath);
    res.json({data: data});
});

app.get('/api/todos/:id', (req, res) => {
  const fs = require('fs');
  const data = fs.readFileSync(todoPath, encoding);
  const id = parseInt(req.params.id);
  const json = JSON.parse(data);
  const filteredItem = json.filter((item) => {
    return item.no === id;
  })[0];
  res.json({
    data: filteredItem
  });
});

app.post('/api/todos', (req, res) => {
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

app.put('/api/todos/:id', (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.id);
  const fs = require('fs');
  const data = fs.readFileSync(todoPath, encoding);
  const json = JSON.parse(data);
  json.forEach((jsonItem, index) => {
    if (jsonItem.no === id) {
      console.log(json[index], body);
      Object.assign(json[index], body);
      return false;
    }
  });
  console.log(json);
  fs.writeFile(todoPath, JSON.stringify(json), function(err) {
    res.send(200);
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const fs = require('fs');
  const data = fs.readFileSync(todoPath, encoding);
  const json = JSON.parse(data);
  // const body = req.body;
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  let itemIndex = 0;
  json.forEach((jsonItem, index) => {
    if (jsonItem.no === id) {
      itemIndex = index;
      return false;
    }
  });
  json.splice(itemIndex, 1);
  fs.writeFile(todoPath, JSON.stringify(json), function(err) {
    res.send(200);
  });
});

app.post('/api/todos/delete', (req, res) => {
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

module.exports = app.listen(3000);