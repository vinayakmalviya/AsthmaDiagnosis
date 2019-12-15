import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';

import reducer from '../reducers';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;


/* const state = {
    name: 'abcd',
    age: 38,
    gender: 'm/f',
    personal: {
        risk: '1/2/3..',
        smoker: '1/0',
        diabetic: '1/0',
        hypertension: '1/0',
        obesity: '1/0',
        BMI: 'value',
        observations: '.....',
    },
    background: {
        family: '1/0',
        childhood: '1/0',
        observations: '....',
    },
    ini_symptoms: {
        date: 'DD/MM/YYYY',
        wheezing: 'value',
        shortness_of_breath: 'value',
        cough: 'value',
        chest_tightness: 'value',
        nightime: 'value',
        restriction: 'value',
        obs: '....',
    },
    comorbidities: {
        pulse: 'value',
        saturation: '%',
        BP: 'value',
        RR: 'value',
        DNS: '1/0',
        faring: '1/0',
        PND: '1/0',
        rhonchi: '1/0',
    },
    tests: {
        CBC: '1/0',
        Xray: '1/0',
        PEFR: [ {
            date: 'DD/MM/YYY',
            values: [ 1, 2, 3 ],
            zones: ['red', 'green', 'yellow']
        } ],
        spirometry: {
            FEV1: 'value',
            ratio: 'value',
            ratio_range: 'value',
        },
        IGE: {
            result: '1/0',
            ratio: '..',
        },
        skin_prick: {
            option: '1/0',
            fungal: '1/0',
            insect: '1/0',
            dust: '1/0',
            pollen: '1/0',
            food: '1/0',
        },
        observations: '....',
    },
    follow_up: [ {
        date: 'DD/MM/YYYY',
        wheezing: 'value',
        shortness_of_breath: 'value',
        cough: 'value',
        chest_lightness: 'value',
        nightime: 'value',
        restriction: 'value',
        inhaler: 'value',
        control: '..',
        obs: '....',
    }, {} ]
} */