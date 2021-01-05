# Software engineering metric visualization

This project focused on exploring the languages used by a user and which languages were commonly used together. This is achieved by querying the Github Rest API to gather data about languages used in the user's repositories.

This is then displayed as a graph, where languages are nodes, and languages used in the same projects are linked together.

The **size** of each node demonstrates how much code is written in that language compared to others, it's **color** is darker depending on how many other languages it's connected to.
Links between languages are stronger the more often they're used together, this means that languages often used in the same projects tend to drift towards each other.

The nodes can be dragged around to get a better look.


## Installation

Clone the repository, then navigate to the project folder in console and run npm install to install the dependencies.

```bash
npm install
```

## Usage
Run the server using:

```bash
node app.js "token" "username"

```
Where token is your personal access token and username is the user you wish to see.
Then go to [localhost:3000](localhost:3000) to see the visualization.

There might be a slight lag depending on how much data has to be processed. The graph tends to form a big group when first created so it's a good idea to move some nodes around to open it.

### Author
Adam Ogórek
