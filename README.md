# Oddle

webdev final project

### how to access the backend

currently, the backend is a node server that must run on your local machine in order to work. in order to set this up so you can access oddlebase via api, follow these steps:
- open your terminal and cd into the oddle_backend folder
- if you have not yet, run ```npm init -y``` and ```npm install axios```
- once you are ready to start the node server, run ```node index.js``` in your terminal. you should see an output similar to this: 
  ```
  Server running on port 3003
  Connected to the in-memory SQlite database.
  Created users table.
  Created session tokens table.
  Created daily stats table.
  ```
- control + C when you are done to kill the server

once you have the database up and running, you can now make api calls from your code to access the information we have stored there. below is the code you need to copy and paste in order to call the apis properly - don't forget to fill in the query values!! there is some setup you must do for this as well, just make sure to double check these things:
- make sure that axios is installed in the oddle_frontend folder. you should have already installed it for oddle_backend, if you haven't yet for oddle_frontend open a separate terminal and cd into the folder oddle_frontend to run ```npm install axios```
- in order for axios to work in your react components, make sure the ```include axios from 'axios'``` statement is at the top of your file

as of right now, the oddlebase is populated with some dummy values i created. players 1 through 15 have all played oddle on sunday, and their tokens (since they are all logged in currently duh) are as follows:
1. kvlq9hzmah
2. j9f5a7g7au8
3. f9oq6hwrra
4. 4yvl0xc4ura
5. 0vgpg6uemmei
6. mmxqirdn3e
7. ynqq4g3gz7k
8. 56i0whw8pfr
9. vfu61svjtv
10. g2az8cxszx9
11. by53qtvbpgn
12. gbi114hqufh
13. 60idor6ms2e
14. m0c4qeaxojk
15. t0fdd1lkn6
their usernames are player# with # being replaced by their number, their emails are their usernames @gmail.com, and their passwords are password#. feel free to play around with these users or create your own, just keep in mind that oddlebase is not in the .gitignore so it will update on github when you push it. 

**user sign up**
this api takes a username, email, and password as strings input by the user, and creates a new entry in the ```users``` table with this information. note that usernames and emails cannot be repeated - the api will return an error.
```javascript
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/signup?username=_&email=_&password=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**user login**
this api takes a username and a password, and allows a user in the users table to create a new session. upon recieving a correct username, password pair this api creates a token for the user in the ```session_tokens``` table.
```javascript
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/login?username=_&password=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**user logout**
this api takes a token corresponding to a logged in user and deletes it from the ```session_tokens``` table.
```javascript
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/logout?token=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get user info**
this api takes a token corresponding to a logged in user and uses that to return what is stored in the ```users``` table for that logged in user.
```javascript
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/user?token=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**update daily stats**
this api gets called when a user finishes the game for the day, as in when they get the oddle wrong. the user provides the username and the frontend will provide the date as a string and how many rounds the user ended up playing. this api then stores these values in the ```daily_stats``` table for later use.
```javascript
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  // rememeber to fill in query parameters
  url: 'http://localhost:3003/updatedaily?username=_&date=_&rounds_played=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get daily players**
when provided with a date, this api uses the ```daily_stats``` table to return a list of people who played on that given day starting with the highest score and ending with the lowest.
```javascript
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/dailyplayers?date=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get top ten players**
this does the same as the above api, but limits the response to only include the top 10 players of the day. this could be useful when implementing a leaderboard of sorts.
```javascript
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/topten?date=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get user win rate**
given a username, this api returns the number of times the user has won the oddle and the number of times the user has played the oddle. the frontend can use these numbers to calculate a win rate. if this proves to be too challenging, let me know and i will try to have the api handle it
```javascript
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/winrate?username=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get rounds played stats**
this api was created with the intention of having a display similar to that of wordle, where there is a graph-type representation of your scores from every time you have played the game. this api will return all the information needed to create this graph: given a username, this api will return ```rounds_played``` which denotes the score the user got that day, and ```COUNT(*)```, the number of times the user has gotten that score
```javascript
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/roundcount?username=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

**get user's daily score**
given a username and date, this api simply returns the score the given user got on the given day.
```javascript
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  // remember to fill in query parameters
  url: 'http://localhost:3003/dailycount?username=_&date=_',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```