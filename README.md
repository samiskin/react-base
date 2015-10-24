# ReactBase
A base to start off developing a webpage in React using ES6 and Redux.  This provides the basic structures needed to have the developer experience that I personally prefer the most.

## Installation

```bash
npm install
npm start
```

## Development

The code structure here is a mix of Flux and Redux, taking the single state and immutability concepts of Redux, and merging them with the uses of Stores as accessors.  

#### Components

While the usual thing you hear is "Components should be stateless!  You should only use props!" I believe that `props` are meant to be thought of as "Parameters", while `state` can be thought of as "the data that is universal to all instances of a component and causes a rerender".

Any data that is gained from stores should be in a `syncState` function which returns an object representing the next state.  On every update, `Component.js` checks to see if the props/state has changed before allowing a rerender.  This relies on __Immutable data__ which you will hopefully maintain in your redux reducers.


#### Stores

Basic Store files (not the main `Store.js` file) do two things: Provide a reducer related to their data and provides accessors for that data.  These two are put in the same file because a change in a reducer will likely require a change in the accessors.

`Store.js` handles pairing each basic store file with the data in the store it is responsible for, and this is done in its `StoreMap` variable in `getStoresReducer`, so whenever you add a new Store and want it to be responsible for `state['varName']`, simply add `varName: newStore` to `StoreMap`.  

#### Actions

Actions should be dispatched using a signature of {type, data}, where type is an exported constant which is declared in the same file, and data is a property with whatever data needed to send.


## Hosting
To compile the `bundle.js` file used when the website is hosted simply run
```bash
npm run build
```

To create the website on Github Pages, follow the instructions on https://pages.github.com/ and make sure the `gh-pages` branch contains `index.html` and a compiled `bundle.js`.
