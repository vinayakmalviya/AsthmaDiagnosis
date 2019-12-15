import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import infoReducer from './infoReducer';

export default combineReducers({
    form: formReducer,
    infoReducer,
});