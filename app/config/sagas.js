import axios from 'axios';
import { takeEvery, select, call, put } from "redux-saga/effects";

import { SEARCH_ERROR, SEARCH_COMPLETE, HANDLE_SEARCH } from "../actions/followupActions";

const search = values => axios.post("apilink", values).then(({ data }) => data ).catch(err => console.log(err));

function* followUpPatient(action) {
    try {
        let patientData = {
            ...action.values,
        };

       const response = yield call(search, patientData);
       const result = response[0];
       
       if(result.error) {
           yield put({ type: SEARCH_ERROR, result });
       } else {
           yield put({ type: SEARCH_COMPLETE, result });
       }
    } catch(e) {
        yield put({ type: SEARCH_ERROR, error: e.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(HANDLE_SEARCH, followUpPatient);
}