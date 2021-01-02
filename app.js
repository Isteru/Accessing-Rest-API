const https = require('https');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  userAgent: 'Isteru',
  auth: "token",
});
username = 'Isteru';
octokit.request('GET /users/{username}/repos', {
  username: username
}).then(({data}) => {
  for (var repo of data) {
    octokit.repos.listCollaborators({
      owner:username,
      repo: repo.name
    }).then(({data}) => {
      console.log(data);
    })
  }
});
