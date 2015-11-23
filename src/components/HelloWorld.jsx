'use strict';

import React from 'react';
import Component from 'Component';
import HelloWorldActions from 'actions/HelloWorldActions';
import HelloWorldStore from 'stores/HelloWorldStore';

import styles from './styles/HelloWorld.css';

export default class HelloWorld extends Component {


  static propTypes = {
    buttonText: React.PropTypes.string
  }

  static defaultProps = {
    buttonText: 'Default Text'
  }

  syncState() {
    return {
      clicked: HelloWorldStore.getTimesClicked()
    };
  }


  clickHandler() {
    console.log('Clicked!');
    HelloWorldActions.clickButton();
  }

  render() {
    return (
      <div className={styles.base} >
        <h1> Hello World </h1>
        <button onClick={this.clickHandler}> {this.props.buttonText} </button>
        {this.state.clicked}
      </div>
    );
  }
}
