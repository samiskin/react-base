'use strict';

var Component = require('Component');
var HelloWorldActions = require('actions/HelloWorldActions').Actions;
var HelloWorldStore = require('stores/HelloWorldStore');

require('./styles/HelloWorld.scss');

export default class HelloWorld extends Component{


  static propTypes = {
    buttonText: React.PropTypes.string
  }

  static defaultProps = {
    buttonText: 'Default Text'
  }

  static stores = [
    HelloWorldStore
  ]

  state = this.updatedState();

  updatedState() {
    return {
      clicked: HelloWorldStore.getTimesClicked()
    };
  }


  clickHandler() {
      console.log("Clicked!");
      HelloWorldActions.clickButton();
  }

  render() {
    return (
      <div className="HelloWorld" >
        <h1> Hello World </h1>
        <button onClick={this.clickHandler}> {this.props.buttonText} </button>
        {this.state.clicked}
      </div>
    );
  }
}
