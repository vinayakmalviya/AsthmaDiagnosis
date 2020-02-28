import {
    ADD_COMPLETE,
    MID_FAIL,
    HANDLE_PERSONAL_INFO,
    HANDLE_FAMILY_INFO,
    HANDLE_SYMPTOMS,
    HANDLE_INVESTIGATIONS,
    HANDLE_COMORBIDITIES,
    HANDLE_FOLLOWUPSYM,
    HANDLE_INVESTIGATIONS_F
} from "../actions/infoActions";

const initialState = {
    new: {
        personal: false,
        background: false,
        midway: false,
        symptoms: false,
        comorbidities: false,
        investigations: false
    },
    followup: {
        symptoms: false,
        investigations: false
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_PERSONAL_INFO:
            return {
                ...state,
                new: {
                    ...state.new,
                    personal: true
                }
            };
        case HANDLE_FAMILY_INFO: {
            return {
                ...state,
                new: {
                    ...state.new,
                    background: true
                }
            }
        }
        case HANDLE_SYMPTOMS: {
            return {
                ...state,
                new: {
                    ...state.new,
                    symptoms: true
                }
            }
        }
        case HANDLE_COMORBIDITIES: {
            return {
                ...state,
                new: {
                    ...state.new,
                    comorbidities: true
                }
            }
        }
        case HANDLE_INVESTIGATIONS: {
            return {
                ...state,
                new: {
                    ...state.new,
                    investigations: true,
                }
            }
        }
        case HANDLE_FOLLOWUPSYM: {
            return {
                ...state,
                followup: {
                    symptoms: true
                }
            }
        }
        case HANDLE_INVESTIGATIONS_F: {
            return {
                ...state,
                followup: {
                    investigations: true
                }
            }
        }
        case ADD_COMPLETE:
            return {
                ...state,
                new: {
                    ...state.new,
                    personal: true,
                    background: true,
                    midway: true
                }
            };
        case MID_FAIL:
            return {
                ...state,
                new: {
                    ...state.new,
                    midway: false
                }
            };
        default:
            return state;
    }
};

export default reducer;