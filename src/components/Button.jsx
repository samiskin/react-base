import React from 'react';
import { connect } from 'Store';
import TextStore from 'stores/TextStore';

class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    color: React.PropTypes.string
  }

  render() {

    return (
      <button> {this.props.text} </button>
    );
  }
}

export default connect(() => ({
    text: TextStore.getText()
  }))(Button);

