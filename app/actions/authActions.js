export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_REGISTER = 'HANDLE_REGISTER';
export const AUTH_COMPLETE = 'AUTH_COMPLETE';
export const HANDLE_LOGOUT = 'HANDLE_LOGOUT';

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
});

export const logoutUser = () => ({
    type: HANDLE_LOGOUT
});