export const HANDLE_SEARCH = 'HANDLE_SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_COMPLETE = 'SEARCH_COMPLETE';

export const searchPatient = (values, resolve, reject) => ({
    type: HANDLE_SEARCH,
    values,
    resolve: resolve,
    reject: reject,
});

