import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

const ReportContainer = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
      <div>
        Report
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
)(ReportContainer);