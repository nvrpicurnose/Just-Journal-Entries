import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CounterActions from '../actions/CounterActions';
import Counter from '../components/Counter';
import Footer from '../components/Footer';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
const App = React.createClass({

  propTypes: {
    counter: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  },

  componentWillMount(){
    gapi.load('client:auth2', this.setupGoogleAPI);
  },

  setupGoogleAPI(){
    const apiKey = 'AIzaSyDRChYVMANy6bgD2YYhNSk2WAhAWeMIuCo';
    const clientId = '860022346150-pvbgc90fhf281e3bc739j6krpof8llbu.apps.googleusercontent.com';
    const scopes = 'profile';

    setTimeout(function(){
      gapi.client.setApiKey('AIzaSyDRChYVMANy6bgD2YYhNSk2WAhAWeMIuCo');
      const GoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
      console.log(GoogleUser.getBasicProfile().getEmail());
    }, 2000);
  },

  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { counter, actions } = this.props;
    return (
      <div className="main-app-container">
        <div className="main-app-nav">Simple Redux Boilerplate</div>

        {/* notice that we then pass those unpacked props into the Counter component */}
        <Counter counter={counter} actions={actions} />
        <Footer />
      </div>
    );
  }
});

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
