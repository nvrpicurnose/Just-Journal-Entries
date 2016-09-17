import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Journal from './Journal';
import { keywordExtractor } from '../../api/nlp';
import { generateEntry } from '../../api/entryCreator';

const JournalContainer = React.createClass({
  propTypes: {
  },

  parseSentence(sentence){
    keywordExtractor(sentence).then(function(desc){
      return generateEntry(sentence, desc);
    });
  },

  render: function() {
    return (
      <div>
        <Journal parseSentence={this.parseSentence} />
      </div>
    );
  }

});

const mapStateToProps = function(store) {
  return {
  };
};

// injects onPlusClick, onMinusClick
function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(JournalContainer);