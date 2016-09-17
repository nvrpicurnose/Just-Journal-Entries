import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppRoutes from './Routes';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
const App = React.createClass({


  componentWillMount(){
    // initiate the GAPI (Google API) with OAuth2, and then execute the setupGoogleAPI callback
    // gapi is a globally available variable
    gapi.load('client:auth2', this.setupGoogleAPI);
  },

  // sets up Google API with OAuth2 clientId (apiKey is not needed if using OAuth2)
  setupGoogleAPI(){
    const self = this;
    /*const apiKey = 'AIzaSyDRChYVMANy6bgD2YYhNSk2WAhAWeMIuCo';
    const clientId = '860022346150-pvbgc90fhf281e3bc739j6krpof8llbu.apps.googleusercontent.com';
    const scopes = 'profile';   // initially we only ask for profile access. Later we request for Google Drive
    */

    // hacky solution using setTimeout to the async problem of Google API being loaded
    setTimeout(function(){
      // gapi.client.setApiKey('AIzaSyDRChYVMANy6bgD2YYhNSk2WAhAWeMIuCo');
      const GoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
      console.log(GoogleUser.getBasicProfile().getEmail());
      self.setupDriveAPI(GoogleUser);
    }, 0);
  },

  // setup Google Drive API
  setupDriveAPI(GoogleUser){
    const self = this;
    // request additional scope permissions
    const scopes = [
      'https://www.googleapis.com/auth/drive', 
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file'
    ];
    const scope = 'https://www.googleapis.com/auth/drive';
    const options = gapi.auth2.SigninOptionsBuilder(
        {'scope': scopes.join(' ')});
    console.log(gapi.auth2);

    GoogleUser.grant(options).then(
        function(success){
          console.log("Google Drive API successfully accessed!");
          console.log(GoogleUser.getGrantedScopes());
          // upon load, we will initiate the drive check
          // gapi.client.load('drive', 'v3', self.initiateDriveFiles);
          gapi.client.load('drive', 'v3', function(){
            gapi.client.drive.files.list({
              pageSize: 1000,
              q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false"
            }).execute(function(resp){
              console.log(resp);
              const initFolder = resp.files.filter(function(file){
                return file.mimeType == 'application/vnd.google-apps.folder' && file.name == 'JustJournalEntries'
              });
              console.log(initFolder);
              if(initFolder.length == 0){
                self.createDriveFolder();
              }else{
                console.log("JustJournalEntries folder exists! Excellent.");
              }
            });
          });
        },
        function(fail){
          alert(JSON.stringify({message: "fail", value: fail}));
        });
  },

  // check Google Drive to find the "JustJournalEntries" folder
  // creates the folder if not found
  initiateDriveFiles(){
    const self = this;
    gapi.client.drive.files.list({
      pageSize: 1000,
      q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false"
    }).execute(function(resp){
      console.log(resp);
      const initFolder = resp.files.filter(function(file){
        return file.mimeType == 'application/vnd.google-apps.folder' && file.name == 'JustJournalEntries'
      });
      console.log(initFolder);
      if(initFolder.length == 0){
        self.createDriveFolder();
      }else{
        console.log("JustJournalEntries folder exists! Excellent.");
      }
    });
  },

  createDriveFolder(){
    console.log("JustJournalEntries folder not found. Creating a new folder.");
    const fileMetadata = {
      name : 'JustJournalEntries',
      mimeType : 'application/vnd.google-apps.folder'
    };
    gapi.client.drive.files.create({
       resource: fileMetadata,
       uploadType: "multipart",
       fields: 'id'
    }).execute(function(err, file) {
      console.log("checking something");
      if(err) {
        // Handle error
        console.log(err);
      } else {
        console.log('Folder Id: ', file.id);
      }
    });
  },

  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { counter, actions } = this.props;
    return (
      <div className="main-app-container">
        {
          AppRoutes
        }
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
