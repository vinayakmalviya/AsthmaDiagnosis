import axios from 'axios';
import { takeEvery, call, put } from "redux-saga/effects";

import { SEARCH_ERROR, SEARCH_COMPLETE, HANDLE_SEARCH } from "../actions/followupActions";

const search = values => axios.post("apilink", values).then(({ data }) => data ).catch(err => ([{ type: "info", heading: "Info" , _error: "Network Error! Please try again after sometime" }]) );

function* followUpPatient(action) {
    try {
        let patientData = {
            ...action.values,
        };

       const response = yield call(search, patientData);
       let result = {};
       console.log("<<<<Ye Idhar Hai!!!!>>>>0000",response);
       
       if(response.length <= 0) {
           result._error = "Patient Not Found";
           result.heading = "Error";
           result.type = "error";
       } else {
           result = response[0];
       }

       console.log("<<<<Ye Idhar Hai!!!!2222>>>>",result);
       
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

export default function* rootSaga() {
    yield takeEvery(HANDLE_SEARCH, followUpPatient);
}