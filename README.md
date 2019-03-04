# Take-Home - SPA

## Getting things up and running
- Install Node v10
    - [Node](https://nodejs.org/en/download/) 
- Clone this repoistory
  - ```git clone git@github.com:100health/take-home.git```

- Running the server and frontend

```
    $ cd take-home
    $ docker-compose up  (wait for the stack to lift) 
    $ npm run install
    $ npm run migrate
    $ npm run seed
```

## Misc 

- API Server routes for Sources and Messages

```
    localhost:3000/source  (GET, POST)
    localhost:3000/source/:id (GET, PUT)
    localhost:3000/source/:id/message (GET)
    localhost:3000/message (GET, POST)
    localhost:3000/message/:id (GET, PUT)
```

- Connect to the frontend using `localhost:9000`
- Connect to PostgreSQL  `$ psql -U redox -h localhost -p 6432 -d redoxdb` (passoword is `redox`)
- You can live edit both the frontend and server code (supports live reloading)