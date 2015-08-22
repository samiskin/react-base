
var App = require('App.jsx');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
    <Route path={"/"} handler={App}>
      <NotFoundRoute handler={App}/>
    </Route>
);

module.exports = Router.create({
    routes: routes,
    location: Router.HistoryLocation
});
