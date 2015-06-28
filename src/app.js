var React = require('react');
var router = require('./router.js');

router.run(function(Handler, state) {
    React.render(<Handler />, document.body);
});
