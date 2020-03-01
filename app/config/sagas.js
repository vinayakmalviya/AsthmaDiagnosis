import { takeEvery, call, put, select } from "redux-saga/effects";
import shortid from 'shortid';
import api from './API';

import { SEARCH_ERROR, SEARCH_COMPLETE, HANDLE_SEARCH } from "../actions/followupActions";
import { HANDLE_LOGIN, HANDLE_REGISTER, AUTH_COMPLETE } from '../actions/authActions';
import { HANDLE_MID_SUBMIT, ADD_COMPLETE, MID_FAIL, HANDLE_FOLLOWUPSYM, HANDLE_UPDATE_PATIENT, UPDATE_COMPLETE } from "../actions/infoActions";

const search = values => api.post("/searchPatient", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

const login = values => api.post("/loginUser", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

const register = values => api.post("/registerUser", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

const addNew = values => api.post("/addPatient", values).then(({ data }) => data ).catch(err => ([{ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }]));

const update = (values, id) =>
  api
    .put(`/updatePatient/${id}`, values)
    .then(({ data }) => data)
    .catch(err => [
      {
        type: "info",
        heading: "Info",
        _error: "Network Error! Please try again after sometime"
      }
    ]);

function* loginUser(action) {
    try {
        let loginData = {
            ...action.values
        };

        const response = yield call(login, loginData);
        
        if(response._error) {
            yield call(action.reject, { ...response });
        } else {
            let userID = response._id;

            yield call(action.resolve);
            yield put({ type: AUTH_COMPLETE, userID: userID, isLoggedIn: true });
        }

    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

function* registerUser(action) {
    try {
        let registerData = {
            name: action.values.name,
            email: action.values.email,
            phone: action.values.phone,
            hospital: action.values.hospital,
            password: action.values.password
        };

        const response = yield call(register, registerData);
        
        if(response._error) {
            yield call(action.reject, { ...response });
        } else {
            yield call(action.resolve);
            yield put({ type: AUTH_COMPLETE, ...response, isLoggedIn: true });
        }

    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

function* addPatient(action) {
    try {
        let patient = yield select(state => state.infoReducer);

        let id = shortid.generate();

        patient._id = id;

        const response = yield call(addNew, patient);

        if(response._error) {
            yield put({ type: MID_FAIL });
        } else {
            yield put({ type: ADD_COMPLETE, _id: response._id });
        }

    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

function* updatePatient(action) {
    try {
        let updateData = yield select(state => state.infoReducer);

        const response = yield call(update, updateData, updateData._id);

        if(response._error) {
        } else {
            yield put({ type: UPDATE_COMPLETE });
        }
    } catch(err) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

function* followUpPatient(action) {
    try {
        let patientData = {
            ...action.values,
        };

       const response = yield call(search, patientData);
       
       if(response._error) {
           yield call(action.reject, { ...response });
           yield put({ type: SEARCH_ERROR, error: response._error });
       } else {
           yield call(action.resolve);
           yield put({ type: SEARCH_COMPLETE, response });
       }
    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

function* addfollowupSymptoms(action) {
	try {
		let updateData = yield select(state => state.infoReducer);

		const response = yield call(update, updateData, updateData._id);

		if (response._error) {
			yield call(action.reject);
		} else {
			yield call(action.resolve);
			yield put({ type: ADD_COMPLETE });
		}
	} catch (e) {
		yield put({ type: SEARCH_ERROR, error: e.message });
	}
}

export default function* rootSaga() {
    yield takeEvery(HANDLE_LOGIN, loginUser);
    yield takeEvery(HANDLE_REGISTER, registerUser);
    yield takeEvery(HANDLE_MID_SUBMIT, addPatient);
    yield takeEvery(HANDLE_UPDATE_PATIENT, updatePatient);
    yield takeEvery(HANDLE_SEARCH, followUpPatient);
    yield takeEvery(HANDLE_FOLLOWUPSYM, addfollowupSymptoms);
}
