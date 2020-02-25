import { takeEvery, call, put } from "redux-saga/effects";
import api from './API';

import { SEARCH_ERROR, SEARCH_COMPLETE, HANDLE_SEARCH } from "../actions/followupActions";
import { HANDLE_LOGIN, HANDLE_REGISTER } from '../actions/authActions';

const search = values => api.post("/searchPatient", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

const addNew = values => api.post("/addPatient", values).then(({ data }) => data ).catch(err => ([{ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }]));

const login = values => api.post("/loginUser", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

const register = values => api.post("/registerUser", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

function* followUpPatient(action) {
    try {
        let patientData = {
            ...action.values,
        };

        console.log(patientData);

       const response = yield call(search, patientData);

       console.log(response);
       
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

function* loginUser(action) {
    try {
        let loginData = {
            ...action.values
        };

        const response = yield call(login, loginData);
        
        if(response._error) {
            yield call(action.reject, { ...response });
        } else {
            yield call(action.resolve);
            yield put({ type: SEARCH_COMPLETE, response });
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
        console.log("<<<<Ye idhar hai!!!!>>>>",response);
        
        if(response._error) {
            yield call(action.reject, { ...response });
        } else {
            yield call(action.resolve);
            yield put({ type: SEARCH_COMPLETE, response });
        }

    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(HANDLE_SEARCH, followUpPatient);
    yield takeEvery(HANDLE_LOGIN, loginUser);
    yield takeEvery(HANDLE_REGISTER, registerUser);
}