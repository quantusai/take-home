# OUTLINE:  
# 1) Take-Home - SPA - Requirements Challenge information 
# 2) OKTA Basic CRUD with Vue.js and Node - Security Auth & Database

# -------------------------------------------------------------------
# 1) Take-Home - SPA
# -------------------------------------------------------------------

## Take Home Assessment
You are working with a complicated network of nodes that send messages between each other. One common type of node in this network is a source who will generate messages to be transmitted to another node on the network. You need the create a view or series of views that allows a user to view a particular source and its messages.

Your take home assessment will be to create a front end application and supporting backend API to fetch and view the sources and messages in the network. 
There is a repo that will serve as a starting point that contains all the data to use as mock data for sources and message.

### Backend API 
Given this data create a backend API that will be able to.

1) Fetch all sources and their basic information
2) Fetch a single source’s information in greater details
3) Fetch all messages for a single source
4) Ability to CRUD source information

Here is the basic API backend route structure we want to see:  
```
    localhost:8888/source  
    localhost:8888/source/:id
    localhost:8888/source/:id/message
    localhost:8888/message
    localhost:8888/message/:mid
```

### Given this API create a front end view that…
1) Allow a user to view all sources
2) Allows a user to view a single source 
   - With more details about the source
   - All the messages for that source
   - An element that displays the aggreate status of messages for a particular source (error, enqueued, finished, processing).

# -------------------------------------------------------------------
# 2) OKTA Basic CRUD with Vue.js and Node
# -------------------------------------------------------------------
This example app shows how to create a Node.js API and display its data with a Vue.js UI.

Please read [Build a Basic CRUD App with Vue.js and Node](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started
To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-vue-node-example.git
cd okta-vue-node-example
npm install
```

This will get a copy of the project installed locally. To start each app, follow the instructions below.
To run the server:

```bash
node ./src/server
```

To run the client:

```bash
npm run dev
```

### Create an Application in Okta
You will need to [create an OpenID Connect Application in Okta](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node#add-authentication-with-okta) to get your values to perform authentication.

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, and give the app a name you’ll remember, and click **Done**.

#### Server Configuration

Set the `issuer` and copy the `clientId` into `src/server.js`.

```javascript
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oalccuta0fx2kHFl356',
  issuer: 'https://dev-108751.okta.com/oauth2/default'
})
```

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.oktapreview`. Make sure you don't include `-admin` in the value!

#### Client Configuration
Set the `issuer` and copy the `clientId` into `src/router/index.js`.

```javascript
Vue.use(Auth, {
  issuer: 'https://dev-108751.okta.com/oauth2/default',
  client_id: '0oalccuta0fx2kHFl356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})
```

## Links
This example uses the following libraries provided by Okta:

* [Okta JWT Verifier](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta Vue SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue)

## Help
Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if you would like to create a support ticket.

## License
Apache 2.0, see [LICENSE](LICENSE).
