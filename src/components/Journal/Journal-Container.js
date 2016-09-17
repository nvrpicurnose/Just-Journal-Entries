import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

const JournalContainer = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
      <div>
        Journal
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