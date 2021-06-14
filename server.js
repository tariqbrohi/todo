const express = require('express')
const path = require('path');
const port = 8080;
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('web-app/static'));
var data = [];
var start = true;
app.get("/getTodo", (req, res) => {
    data = [];
    var dat = fs.readFileSync('./web-app/static/store.json', 'utf8');
    let todos = JSON.parse(dat);
    for (let i = 0; i < todos.length; i++) {
        data.push(todos[i]);
    }
    res.json(todos);
})

app.post('/add', (req, res) => {
    data.push(req.body);
    fs.writeFile('store.json', data, (err, d) => {
        if (err) {
            throw err;
        }
        else {
            fs.writeFileSync("./web-app/static/store.json", JSON.stringify(data), 'utf8');
        }
    });
    res.redirect("/");
})
app.post('/delTodo', (req, res) => {
    let todo = req.body;
    for (let i = 0; i < data.length; i++) {
        if (data[i]["todo"] === todo) {
            data[i] = {};
            break;
        }
    }
    fs.writeFile('store.json', data, (err) => {
        if (err) {
            throw err;
        }
        else {
            fs.writeFileSync("./web-app/static/store.json", JSON.stringify(data), 'utf8');
        }
    });
    res.redirect("/");
})
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/web-app/static/index.html'));
});

app.listen(port, function () {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
