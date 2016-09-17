import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

const CompanyContainer = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
      <div>
        Company
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
)(CompanyContainer);