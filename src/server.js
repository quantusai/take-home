const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oalccuta0fx2kHFl356',
  issuer: 'https://dev-108751.okta.com/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

// verify JWT token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next) // jwt did not verify!
})

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
})

// Define our Message model
// id, createdAt, and updatedAt are added by sequelize automatically
let Message = database.define('messages', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  guid: Sequelize.STRING,
  source_id: Sequelize.STRING,
  updatedat: Sequelize.STRING,
  createdat: Sequelize.STRING

})

let Resource = database.define('sources', {
  name: Sequelize.STRING,
  updatedat: Sequelize.STRING,
  createdat: Sequelize.STRING
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Sequalize will make its tables pluralized 
// more info here https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names

// Create the dynamic REST resource for our Message model
let userResource = epilogue.resource({
  model: Message,
  endpoints: ['/posts', '/posts/:id']
})

const userResource2 = epilogue.resource({
  model: Resource,
  endpoints: ['/resources', '/resources/:id'],
});

// Resets the database and launches the express app on :8081
// reference for stopping sequalize from dropping the table
database
  .sync({ force: false })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
