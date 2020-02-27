import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import infoReducer from './infoReducer';
import trackReducer from './trackReducer';

export default combineReducers({
    form: formReducer,
    infoReducer,
    trackReducer
});