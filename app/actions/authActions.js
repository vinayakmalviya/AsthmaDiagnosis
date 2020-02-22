export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_REGISTER = 'HANDLE_REGISTER';

export const loginUser = (values, resolve, reject) => ({
    type: HANDLE_LOGIN,
    values,
    resolve: resolve,
    reject: reject
});

export const registerUser = values => ({
    type: HANDLE_REGISTER,
    values
});