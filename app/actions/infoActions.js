export const HANDLE_TEST_ACTION = 'HANDLE_TEST_ACTION';
export const HANDLE_PERSONAL_INFO = 'HANDLE_PERSONAL_INFO';
export const HANDLE_FAMILY_INFO = 'HANDLE_FAMILY_INFO';
export const HANDLE_MID_SUBMIT = 'HANDLE_MID_SUBMIT';
export const HANDLE_SYMPTOMS = 'HANDLE_SYMPTOMS';
export const HANDLE_INVESTIGATIONS = 'HANDLE_INVESTIGATIONS';
export const HANDLE_COMORBIDITIES = 'HANDLE_COMORBIDITIES';
export const ADD_COMPLETE = 'ADD_COMPLETE';
export const HANDLE_REFRESH = 'HANDLE_REFRESH';
export const HANDLE_FOLLOWUPSYM = 'HANDLE_FOLLOWUPSYM';

export const testSubmit = values => ({
    type: HANDLE_TEST_ACTION,
    name: values.name,
    gender: values.email,
});

export const personalInfoSubmit = values => ({
    type: HANDLE_PERSONAL_INFO,
    values,
});

export const backgroundInfoSubmit = values => ({
    type: HANDLE_FAMILY_INFO,
    values,
});

export const midwaySubmit = () => ({
    type: HANDLE_MID_SUBMIT,
})

export const symptomsSubmit = values => ({
    type: HANDLE_SYMPTOMS,
    values,
});

export const investigationsSubmit = values => ({
    type: HANDLE_INVESTIGATIONS,
    values,
});

export const comorbiditiesSubmit = values => ({
    type: HANDLE_COMORBIDITIES,
    values,
});

export const followupRefresh = () => ({
    type: HANDLE_REFRESH,
});

export const followupSymSubmit = values => ({
    type: HANDLE_FOLLOWUPSYM,
    values,
});