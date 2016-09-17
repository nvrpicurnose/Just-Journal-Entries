
const INITIAL_STATE = {
	chef: null,
	meals: []
};

export default function chefReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

	  case "POST_MEAL":
	    return state;

	  default:
	    return state;

  }
}
