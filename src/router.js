
var HelloWorld = require('HelloWorld.jsx');
var Canvas = require('Canvas.jsx');

var Router = require('react-router');
var Route = Router.Route;

var routes = (
    <Route path="/" handler={Canvas}>
    </Route>

);

module.exports = Router.create({
    routes: routes,
    location: Router.HistoryLocation
});
