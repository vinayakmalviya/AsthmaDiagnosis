import { HANDLE_TEST_ACTION } from "../actions/infoActions";

const initialState = {
    name: '',
    age: 0,
    gender: '',
    personal: {
        risk: '',
        smoker: '',
        diabetic: '',
        hypertension: '',
        obesity: '',
        BMI: '',
        observations: '.',
    },
    background: {
        family: '',
        childhood: '',
        observations: '',
    },
    ini_symptoms: {
        date: '',
        wheezing: '',
        shortness_of_breath: '',
        cough: '',
        chest_tightness: '',
        nightime: '',
        restriction: '',
        obs: '',
    },
    comorbidities: {
        pulse: '',
        saturation: '',
        BP: '',
        RR: '',
        DNS: '',
        faring: '',
        PND: '',
        rhonchi: '',
    },
    tests: {
        CBC: '',
        Xray: '',
        PEFR: [],
        spirometry: {},
        IGE: {},
        skin_prick: {},
        observations: '',
    },
    follow_up: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_TEST_ACTION:
            return {
                ...state,
                name: action.name,
                gender: action.gender,
            }
        default:
            return state;
    }
};

export default reducer;