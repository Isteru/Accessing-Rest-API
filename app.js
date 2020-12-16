function getUser(username) {
  const url = `https://api.github.com/users/${username}`;
  const https = require('https');
  const options = {
    headers: {
      'user-agent': 'Isteru'
    }
  }

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
function getReposNames(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const https = require('https');
  const options = {
    headers: {
      'user-agent': 'Isteru'
    }
  }

  const req = https.get(url, options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  let raw = '';
  res.on('data', d => {
    raw+=d;
  })
  res.on('end', () => {
    const parsed = JSON.parse(raw);
    console.log("Total repos:" + parsed.length);
    for (repo of parsed) {
      console.log(repo.name);
    }
  })
})
req.on('error', error => {
  console.error(error)
})
}

getReposNames('esjmb');
