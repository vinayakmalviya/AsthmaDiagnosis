import {
    ADD_COMPLETE,
    MID_FAIL,
    HANDLE_PERSONAL_INFO
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