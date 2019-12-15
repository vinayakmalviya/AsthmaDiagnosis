export const HANDLE_TEST_ACTION = 'HANDLE_TEST_ACTION';
export const HANDLE_PERSONAL_INFO = 'HANDLE_PERSONAL_INFO';

export const testSubmit = values => ({
    type: HANDLE_TEST_ACTION,
    name: values.name,
    gender: values.email,
});

export const personalInfoSubmit = values => ({
    type: HANDLE_PERSONAL_INFO,
    values,
});