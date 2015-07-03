
var HelloWorld = require('HelloWorld.jsx');
var Canvas = require('Canvas.jsx');

var Router = require('react-router');
var Route = Router.Route;

var routes = (
    <Route path="/ReactBase" handler={Canvas}>
    </Route>

);

module.exports = Router.create({
    routes: routes,
    location: Router.HistoryLocation
});
