import moment from "moment";

import {
	HANDLE_TEST_ACTION,
	HANDLE_SYMPTOMS,
	HANDLE_PERSONAL_INFO,
	HANDLE_FAMILY_INFO,
	HANDLE_INVESTIGATIONS,
	HANDLE_COMORBIDITIES,
	HANDLE_REFRESH,
	ADD_COMPLETE,
	HANDLE_FOLLOWUPSYM,
	HANDLE_INVESTIGATIONS_F,
	HANDLE_DIAGNOSIS,
} from "../actions/infoActions";

import { SELECT_COMPLETE, HANDLE_CONTROL } from "../actions/followupActions";

import { AUTH_COMPLETE, HANDLE_LOGOUT } from "../actions/authActions";

const initialState = {
	_id: "",
	userID: "",
	isLoggedIn: false,
	name: "",
	age: 0,
	gender: "",
	phone: 0,
	diagnosis: "",
	personal: {
		risk: 0,
		smoker: false,
		diabetic: false,
		hypertension: false,
		obesity: false,
		observations: "",
	},
	background: {
		family: "",
		childhood: "",
		allergy_hist: {},
		observations: "",
	},
	ini_symptoms: {
		date: "",
		wheezing: "",
		shortness_of_breath: "",
		cough: "",
		chest_tightness: "",
		nighttime: "",
		restriction: "",
		ronchi: "",
		crepts: "",
		breath_sound: "",
		ptr: "",
		observations: "",
	},
	comorbidities: {
		pulse: "",
		saturation: "",
		blood_pressure_sys: "",
		blood_pressure_dia: "",
		resp_rate: "",
		urt_findings: {},
	},
	tests: {
		cbc: {},
		xray: "",
		pefr: "",
		spirometry: {},
		IGE: "",
		skin_prick: {},
		observations: "",
	},
	follow_up: [],
};

const date = moment(new Date()).format("DD/MM/YYYY");

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_TEST_ACTION:
			return {
				...state,
				name: action.name,
				gender: action.gender,
			};
		case AUTH_COMPLETE: {
			return {
				...initialState,
				userID: action.userID,
				isLoggedIn: action.isLoggedIn,
			};
		}
		case HANDLE_LOGOUT:
			return {
				...initialState,
			};
		case HANDLE_PERSONAL_INFO:
			return {
				...state,
				name: action.values.name,
				age: action.values.age,
				gender: action.values.gender,
				phone: action.values.phone,
				personal: {
					risk: action.values.occupation,
					smoker: action.values.smoker,
					diabetic: action.values.diabetic,
					hypertension: action.values.hypertension,
					obesity: action.values.obesity,
					observations: action.values.observations,
				},
			};
		case HANDLE_FAMILY_INFO:
			return {
				...state,
				background: {
					family: action.values.family,
					childhood: action.values.childhood,
					allergy_hist: {
						...action.values.allergy_hist,
						other: action.values.other_allergs,
					},
					observations: action.values.observations,
				},
			};
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
					ronchi: action.values.ronchi,
					breath_sound: action.values.breath_sound,
					crepts: action.values.crepts,
					ptr: action.values.ptr,
					observations: action.values.observations,
				},
			};
		case HANDLE_INVESTIGATIONS:
			return {
				...state,
				tests: {
					cbc: {
						hb: action.values.hb,
						wbc: action.values.wbc,
						eosin: action.values.eosin,
						aec: action.values.aec,
					},
					xray: action.values.xray,
					pefr: action.values.pefr,
					spirometry: {
						pre: {
							fev1: action.values.fev1,
							fev1_range: action.values.fev1_range,
							ratio: action.values.ratio,
							ratio_range: action.values.ratio_range,
							fvc: action.values.fvc,
							mmef: action.values.mmef,
						},
						post: {
							fev1: action.values.fev1P,
							fev1_range: action.values.fev1_rangeP,
							ratio: action.values.ratioP,
							ratio_range: action.values.ratio_rangeP,
							fvc: action.values.fvcP,
							mmef: action.values.mmefP,
						},
					},
					ige: action.values.ige,
					skin_prick: {
						fungal: { ...action.values.fungal },
						insect: { ...action.values.insect },
						pollen: { ...action.values.pollen },
						food: { ...action.values.food },
						others: { ...action.values.others },
					},
					observations: action.values.observations,
				},
			};
		case HANDLE_COMORBIDITIES:
			return {
				...state,
				comorbidities: {
					pulse: action.values.pulse,
					saturation: action.values.saturation,
					blood_pressure_sys: action.values.blood_pressure_sys,
					blood_pressure_dia: action.values.blood_pressure_dia,
					resp_rate: action.values.resp_rate,
					urt_findings: action.values.urt_findings,
				},
			};
		case HANDLE_REFRESH:
			return {
				...initialState,
				userID: state.userID,
				isLoggedIn: true,
			};

		case SELECT_COMPLETE:
			return {
				...state,
				...action.patient,
				userID: state.userID,
			};
		case HANDLE_FOLLOWUPSYM:
			if (action.index == state.follow_up.length) {
				return {
					...state,
					follow_up: [
						...state.follow_up,
						{
							symptom: action.values.value,
							date: date,
						},
					],
				};
			} else {
				return {
					...state,
					follow_up: state.follow_up.map((foll, index) =>
						index == action.index
							? foll.symptom && foll.symptom.length > 0
								? {
										...foll,
										symptom: [
											...foll.symptom,
											...action.values.value,
										],
										date: date,
								  }
								: {
										...foll,
										symptom: [...action.values.value],
										date: date,
								  }
							: foll
					),
				};
			}
		case HANDLE_INVESTIGATIONS_F:
			if (action.index == state.follow_up.length) {
				return {
					...state,
					follow_up: [
						...state.follow_up,
						{
							date: date,
							pefr: action.values.pefr,
						},
					],
				};
			} else {
				return {
					...state,
					follow_up: state.follow_up.map((foll, index) =>
						index == action.index
							? { ...foll, pefr: action.values.pefr, date: date }
							: foll
					),
				};
			}
		case HANDLE_DIAGNOSIS:
			return {
				...state,
				diagnosis: {
					...state.diagnosis,
					...action.payload,
				},
			};
		case HANDLE_CONTROL:
			return {
				...state,
				follow_up: state.follow_up.map((foll, index) =>
					index == action.index
						? {
								...foll,
								control: action.control,
								treatment: action.treatment,
						  }
						: foll
				),
			};
		case ADD_COMPLETE:
			return {
				_id: action._id,
				...state,
			};

		default:
			return state;
	}
};

export default reducer;

/* const initialState = {
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
        allergy_hist: {
            alr: '',
            adt: '',
            dust_a: '',
            drug: '',
            food_a: '',
            eia: '',
            gerd: '',
        },
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
        blood_pressure: '',
        resp_rate: '',
        urt_findings: {
            dns: '',
            pharyn: '',
            rhonchi: '',
            pnd: '',
            hpt: '',
            nps: '',
            ear_dis: '',
        }
    },
    tests: {
        cbc: {},
        xray: '',
        pefr: [],
        spirometry: {},
        IGE: '',
        skin_prick: {},
        observations: '',
    },
    follow_up: []
}; */
