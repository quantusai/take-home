# OUTLINE:  
# 1) Take-Home - SPA - Requirements Challenge information 
# 2) OKTA Basic CRUD with Vue.js and Node - Security Auth & Database
# 3) Theme-ing components - base from ARBANO VUE.js theme - https://demos.vuejsadmin.com/arbano/free/#/
# -------------------------------------------------------------------
1) Take-Home - SPA
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
2) OKTA Basic CRUD with Vue.js and Node
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

# -------------------------------------------------------------------
3) Theme-ing components - base from ARBANO VUE.js theme - https://demos.vuejsadmin.com/arbano/free/#/
# -------------------------------------------------------------------

# Arbano - Free vuejs Admin Template [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Arbano%20-%20Free%20Vue%20Admin%20Template%20&url=https://vuejsadmin.com/product/arbano-vuejs-admin-pro/&hashtags=bootstrap,admin,template,dashboard,panel,free,angular,react,vue)

[![Bootstrap Admin Templates Bundle](https://vuejsadmin.com/wp-content/uploads/edd/2018/06/arbano-cover.jpg)](https://vuejsadmin.com/product/arbano-vuejs-admin-pro/)

### Check out VueJS Bootstrap Admin Dashboard Template ###

# Get More [Free VueJS BootStrap Admin Templates](https://vuejsadmin.com) #

Arbano is a Free Template which can be used for both personal and business purpose. The light version is free but if you love to get dedicated support with more options then you with the pro version. 

**NOTE:** Please remember to **STAR** this project and **FOLLOW** [our Github](https://github.com/litonarefin/arbano) to keep you update with this template.

## [Arbano Free](https://vuejsadmin.com/product/arbano/) ##
## [Arbano Pro](https://vuejsadmin.com/product/arbano-vuejs-admin-pro/) ##
## [Demo](https://demos.vuejsadmin.com/arbano/) ##
## [Documentation](https://docs.vuejsadmin.com/docs/arbano-vue-js-admin/) ##


### Features 
*  Recent Bootstrap and VueJS version
*  Built with Vue-CLI to generate components on the fly
*  Built with SCSS
*  Tons of Icons
*  Chart.js – Line Chart, Bar Chart, Doughnut Chart, Pie Chart, Polar Area Chart
*  Built in Widgets and Components
*  Advanced Google Maps Integrations- Google Maps, Bubble Maps, Leaflet Maps, Line Maps
*  Nested Routing with Components Name
*  Developer friendly code
*  Animated Progress Bar and Vue Progress Bars
*  Blazing Fast and LightWeight
*  Clean and Modern Design
*  Fully Customizable
*  Developer Friendly Code
*  Completely Modular! Every Single Element has its own module
## What's included

Within the download you'll find the following directories and files:
```
arbano-vuejs-free/
├── src/              # Main project Folder
│   └── assets/           # CSS + JS + Font's 
│   └── components/           # Components elements
│   └── directives/           # Directives 
│   └── images/           # Image Folder
│   └── layouts/           # HomePage Layouts 
│   └── pages/           # Login, Register, 404 pages
│   └── router/           # Vue-router
│   └── store/           # State management
│   └── views/           # Render Front End View
│   └── App.vue           # App File
│   └── favicon.ico           # Favicon
│   └── main.js           # Main JS File
│   └── nav.js           # Nav Js File
├── package.json                 # Dependency Packages
├── README.md                 # Read Me
├── webpack.config.js                 # Webpack Configuration
├── yarn.lock                 # Yarn Package
├── index.html                # Main Index File
```
### License

MIT License Copyright (c) 2018 Jewel Theme

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.