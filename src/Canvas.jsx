'use strict';

var React = require('react');
var d3 = require('d3');

var Canvas = React.createClass({

  componentDidMount() {

    var width = 960,
    height = 500,
    radius = Math.min(width, height);

    var radii = {
      "sun": radius / 8,
      "earthOrbit": radius / 2.5,
      "earth": radius / 32,
      "moonOrbit": radius / 16,
      "moon": radius / 96
    };

    console.log("Test");

    var spacetime = d3.select(React.findDOMNode(this.refs.d3));
    var svg = spacetime.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    // Sun
    svg.append("circle")
      .attr("class", "sun")
      .attr("r", radii.sun)
      .style("fill", "rgba(255, 204, 0, 1.0)");
  },

  render() {
    return (
      <div ref="d3" />
    );
  }
});


module.exports = Canvas;
