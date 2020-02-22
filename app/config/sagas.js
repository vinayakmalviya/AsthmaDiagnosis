import axios from 'axios';
import { takeEvery, call, put } from "redux-saga/effects";

import { SEARCH_ERROR, SEARCH_COMPLETE, HANDLE_SEARCH } from "../actions/followupActions";
import { HANDLE_LOGIN } from '../actions/authActions';

const search = values => axios.post("apilink", values).then(({ data }) => data ).catch(err => ([{ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }]));

const addNew = values => axios.post("apilink", values).then(({ data }) => data ).catch(err => ([{ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }]));

const login = values => axios.post("apilink", values).then(({ data }) => data ).catch(err => ({ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }));

function* followUpPatient(action) {
    try {
        let patientData = {
            ...action.values,
        };

       const response = yield call(search, patientData);
       let result = {};
       
       if(response.length <= 0) {
           result._error = "Patient Not Found";
           result.heading = "Error";
           result.type = "error";
       } else {
           result = response[0];
       }
       
       if(result._error) {
           yield call(action.reject, { ...result });
           yield put({ type: SEARCH_ERROR, error: result._error });
       } else {
           yield call(action.resolve);
           yield put({ type: SEARCH_COMPLETE, result });
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

export default function* rootSaga() {
    yield takeEvery(HANDLE_SEARCH, followUpPatient);
    yield takeEvery(HANDLE_LOGIN, loginUser);
}