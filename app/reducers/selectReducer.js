import { SEARCH_COMPLETE } from "../actions/followupActions";
import { HANDLE_REFRESH } from "../actions/infoActions";

const initialState = {
	resolve: "",
	reject: "",
	patients: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_REFRESH:
			return {
				...initialState,
			};
		case SEARCH_COMPLETE:
			return {
				...state,
				resolve: action.resolve,
				reject: action.reject,
				patients: action.response,
			};
		default:
			return state;
	}
};

export default reducer;
