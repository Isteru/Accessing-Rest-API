var http = require('http');
var path = require('path');
const https = require('https');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  userAgent: 'Isteru',
  auth: "token",
});
let username = 'Isteru';
let repo = 'Accessing-Rest-API'
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
  octokit.request('GET /repos/{username}/{repo}/stats/punch_card', {
  username: username,
  repo: repo
}).then(({data}) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayCounts = new Array(7).fill(0);
  for(dayHour of data) {
      let dayNum=dayHour[0];
      dayCounts[dayNum]+=dayHour[2];
  }
  let result = '[';
  for (var i = 0; i < days.length; i++) {
    result += `{"Day": "${days[i]}", "commits": ${dayCounts[i]}},`
  }
  result = result.substring(0, result.length-1);
  result += ']';
  res.write(result);
  res.end();
})

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
