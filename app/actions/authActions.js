export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_REGISTER = 'HANDLE_REGISTER';
export const HANDLE_FOLLOWUPSYMUSER = 'HANDLE_FOLLOWUPSYMUSER';
export const AUTH_COMPLETE = 'AUTH_COMPLETE';

export const loginUser = (values, resolve, reject) => ({
    type: HANDLE_LOGIN,
    values,
    resolve: resolve,
    reject: reject
});

export const registerUser = (values, resolve, reject) => ({
    type: HANDLE_REGISTER,
    values,
    resolve: resolve,
    reject: reject
});

export const authComplete = (userID) => ({
    type: AUTH_COMPLETE,
    isLoggedIn: true,
    userID,
})