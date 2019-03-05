# Take-Home - SPA

## Getting things up and running
- Install Node v10
    - [Node](https://nodejs.org/en/download/) 
- Clone this repoistory
  - ```git clone git@github.com:100health/take-home.git```

- Running the server and frontend

```
    $ cd take-home
    $ npm install
    $ npm run migrate:up
    $ npm run seed
    $ npm run start:server
```

## Misc 

- API Server routes for Sources and Messages

```
    localhost:8888/source  (GET, POST)
    localhost:8888/source/:id (GET, PUT)
    localhost:8888/source/:id/message (GET)
    localhost:8888/message (GET, POST)
    localhost:8888/message/:id (GET, PUT)
```
