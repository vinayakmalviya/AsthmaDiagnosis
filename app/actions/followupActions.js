export const HANDLE_SEARCH = "HANDLE_SEARCH";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SEARCH_COMPLETE = "SEARCH_COMPLETE";
export const SELECT_COMPLETE = "SELECT_COMPLETE";
export const HANDLE_PEFR = "HANDLE_PEFR";

export const searchPatient = (values, resolve, reject) => ({
	type: HANDLE_SEARCH,
	values,
	resolve: resolve,
	reject: reject,
});

export const selectComplete = (patient) => ({
	type: SELECT_COMPLETE,
	patient: patient,
});

export const pefrFollowUp = (values) => ({
	type: HANDLE_PEFR,
	values,
});
