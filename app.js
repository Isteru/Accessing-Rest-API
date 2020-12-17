const https = require('https');
const options = {
  headers: {
    'user-agent': 'Isteru'
  }
}
function getUser(username) {
  const url = `https://api.github.com/users/${username}`;

  const req = https.get(url, options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  let raw = '';
  res.on('data', d => {
    raw+=d;
  })
  res.on('end', () => {
    const parsed = JSON.parse(raw);
    console.log(parsed);
  })
})
req.on('error', error => {
  console.error(error)
})
}
//returns a list of all repos of a user
async function getRepos(username) {
  return new Promise(function(resolve, reject) {
    const url = `https://api.github.com/users/${username}/repos`;
    const req = https.get(url, options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    let raw = '';
    res.on('data', d => {
      raw+=d;
    })
    res.on('end', () => {
      const parsed = JSON.parse(raw);
      resolve(parsed);
    })
  })
  req.on('error', error => {
    cosole.log(error);
    reject(Error(error));
  })
});
}
//Returns a list of all people who collaborated with user
async function getAllUserCollaborators(username) {
  const repos = await getRepos(username);
  let collaborators=[];
  let promises = [];
  for (repo of repos) {
    promises.push(new Promise(function(resolve, reject) {
      const url = `https://api.github.com/repos/${username}/${repo.name}/collaborators`
      const req = https.get(url, options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        if(res.statusCode==200) {
          let raw = '';
          res.on('data', d => {
            raw+=d;
          })
          res.on('end', () => {
            const parsed = JSON.parse(raw);
              resolve(parsed);
          })
        }
        else {
          reject();
        }
      })
    }))
  }
  await Promise.allSettled(promises).then((results) => results.forEach((result) => {
    if(result.status='fulfilled') {
      let repoCollaborators = result.value;
      for(collaborator of repoCollaborators) {
        collaborators.push(collaborator);
      }
    }
  })).then( () => console.log(collaborators.length)).catch( () => console.log("couldn't access"));
  return collaborators;
}
getAllUserCollaborators("Isteru").then((res) => {console.log(res);})
