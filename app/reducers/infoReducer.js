import { HANDLE_TEST_ACTION, HANDLE_SYMPTOMS, HANDLE_PERSONAL_INFO, HANDLE_FAMILY_INFO, HANDLE_INVESTIGATIONS } from "../actions/infoActions";

const initialState = {
    name: '',
    age: 0,
    gender: '',
    personal: {
        risk: 0,
        smoker: false,
        diabetic: false,
        hypertension: false,
        obesity: false,
        observations: '',
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
        nighttime: '',
        restriction: '',
        observations: '',
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
        cbc: '',
        xray: '',
        pefr: [],
        spirometry: {},
        IGE: '',
        skin_prick: {},
        observations: '',
    },
    follow_up: []
};

const date = new Date().toDateString();

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_TEST_ACTION:
            return {
                ...state,
                name: action.name,
                gender: action.gender,
            }
        case HANDLE_PERSONAL_INFO:
            return {
                ...state,
                name: action.values.name,
                age: action.values.age,
                gender: action.values.gender,
                personal: {
                    risk: action.values.occupation,
                    smoker: action.values.smoker,
                    diabetic: action.values.diabetic,
                    hypertension: action.values.hypertension,
                    obesity: action.values.obesity,
                    observations: action.values.observations,
                },
            }
        case HANDLE_FAMILY_INFO:
            return {
                ...state,
                background: {
                    family: action.values.family,
                    childhood: action.values.childhood,
                    observations: action.values.observations,
                },
            }
        case HANDLE_SYMPTOMS:
            return {
                ...state,
                ini_symptoms: {
                    date: date,
                    wheezing: action.values.wheezing,
                    shortness_of_breath: action.values.shortness_of_breath,
                    cough: action.values.cough,
                    chest_tightness: action.values.chest_tightness,
                    nighttime: action.values.nighttime,
                    restriction: action.values.restriction,
                    observations: action.values.observations,
                },
            }
        case HANDLE_INVESTIGATIONS:
            return {
                ...state,
                tests: {
                    cbc: action.values.cbc,
                    xray: action.values.xray,
                    pefr: [action.values.push],
                    spirometry: {
                        fev1: action.values.fev1,
                        fev1_range: action.values.fev1_range,
                        ratio: action.values.ratio,
                        ratio_range: action.values.ratio_range,
                    },
                    ige: action.values.ige,
                    skin_prick: {
                        fungal: action.values.fungal,
                        insect: action.values.insect,
                        dust: action.values.dust,
                        pollen: action.values.pollen,
                        food: action.values.food,
                    },
                    observations: action.values.observations,
                }
            }
        default:
            return state;
    }
};

export default reducer;