import {
	ADD_COMPLETE,
	MID_FAIL,
	HANDLE_PERSONAL_INFO,
	HANDLE_FAMILY_INFO,
	HANDLE_SYMPTOMS,
	HANDLE_INVESTIGATIONS,
	HANDLE_COMORBIDITIES,
	HANDLE_FOLLOWUPSYM,
	HANDLE_INVESTIGATIONS_F,
	HANDLE_REFRESH,
	HANDLE_DIAGNOSIS,
} from "../actions/infoActions";
import { SELECT_COMPLETE, HANDLE_CONTROL } from "../actions/followupActions";

const initialState = {
	new: {
		personal: false,
		background: false,
		midway: false,
		symptoms: false,
		comorbidities: false,
		investigations: false,
		diagnosis: false,
	},
	followup: {
		symptoms: false,
		investigations: false,
		control: false,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_PERSONAL_INFO:
			return {
				...state,
				new: {
					...state.new,
					personal: true,
				},
			};
		case HANDLE_FAMILY_INFO: {
			return {
				...state,
				new: {
					...state.new,
					background: true,
				},
			};
		}
		case HANDLE_SYMPTOMS: {
			return {
				...state,
				new: {
					...state.new,
					symptoms: true,
				},
			};
		}
		case HANDLE_COMORBIDITIES: {
			return {
				...state,
				new: {
					...state.new,
					comorbidities: true,
				},
			};
		}
		case HANDLE_INVESTIGATIONS: {
			return {
				...state,
				new: {
					...state.new,
					investigations: true,
				},
			};
		}
		case HANDLE_DIAGNOSIS: {
			return {
				...state,
				new: {
					...state.new,
					diagnosis: true,
				},
			};
		}
		case HANDLE_FOLLOWUPSYM: {
			return {
				...state,
				followup: {
					...state.followup,
					symptoms: true,
				},
			};
		}
		case HANDLE_INVESTIGATIONS_F: {
			return {
				...state,
				followup: {
					...state.followup,
					investigations: true,
				},
			};
		}
		case HANDLE_CONTROL: {
			return {
				...state,
				followup: {
					...state.followup,
					control: true,
				},
			};
		}
		case ADD_COMPLETE:
			return {
				...state,
				new: {
					...state.new,
					personal: true,
					background: true,
					midway: true,
				},
			};
		case MID_FAIL:
			return {
				...state,
				new: {
					...state.new,
					midway: false,
				},
			};
		case HANDLE_REFRESH:
			return {
				...initialState,
			};
		case SELECT_COMPLETE:
			return {
				...state,
				new: {
					personal: true,
					background: true,
					midway: true,
					symptoms: true,
					comorbidities: true,
					investigations: true,
				},
			};
		default:
			return state;
	}
};

export default reducer;
