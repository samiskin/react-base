# ReactBase
A base to start off developing a static webpage in React using ES6 and Hotloading.  
The website being static lets it be hosted by Github Pages.

## Local Installation

Install [node.js](https://nodejs.org), clone this repo and change the `origin` git remote.

Install all dependancies
``` text
npm install
```

## Development
Local development is done using [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) and can be run on `localhost:8080` using
``` text
npm start
```

To compile the `bundle.js` file used when the website is hosted simply run
```
npm run build
```

To create the website on Github Pages, follow the instructions on https://pages.github.com/ and make sure the branch contains `index.html` and compiled `bundle.js`.
