//import {newEntry} from '../api/ObjectCreators';
import {SEND_ENTRY, CLEAR_ENTRY} from '../actions/ActionTypes';

const INITIAL_STATE = {
	newEntry: {}
};

export default function chefReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

	  case SEND_ENTRY:{
	  	//const entry = newEntry(action.sentence);
	    return Object.assign({}, state, {
		          newEntry: "newEntry"
		        });
	  }

	  case CLEAR_ENTRY:{
	  	return Object.assign({}, state, {
		          newEntry: null
		        });
	  }

	  default:
	    return state;
  }
}
