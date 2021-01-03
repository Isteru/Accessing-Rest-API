var http = require('http');
var path = require('path');
const https = require('https');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  userAgent: 'Isteru',
  auth: "token",
});
// Some constances
const express = require('express')
const app = express()
const port = 3000
// Setup static folder
app.use(express.static(__dirname + "/static/"));
// rendering html file.
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/data.json', (req, res) => {
  var names = ['Anne', 'Bill', 'Bob', 'James', 'Michael'];
  var data = '[';
  for (name of names) {
    data += `{"name": "${name}","commits": ${20 + Math.floor(Math.random()*20)}},`
  }
  data = data.substring(0,data.length-1);
  data += `]`;
  res.write(data);
  res.end();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
