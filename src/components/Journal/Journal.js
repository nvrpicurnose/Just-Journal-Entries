import React, { Component, PropTypes } from 'react';

const Journal = React.createClass({
  propTypes: {
    parseSentence: PropTypes.func.isRequired
  },

  getInputSentence(){
    const sentence = this.refs.sentence.getDOMNode().value;
    this.props.parseSentence(sentence);
  },

  render() {
    return (
      <div>
        Journal
        <br/><br/><br/>
        <input ref='sentence' type='text' placeholder='Ex: I spent $50 on chalk' />
        <button onClick={this.getInputSentence}>Parse It!</button>
      </div>
    );
  }
});

export default Journal;