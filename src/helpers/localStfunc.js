const saveDataToLocalSt = (key, value) => {
	try {
		const serializedState = JSON.stringify(value);
		localStorage.setItem(key, serializedState);
	} catch (error) {
		console.error('Set state error: ', error.message);
	}
};

const loadDataFromLocalSt = key => {
	try {
		const serializedState = localStorage.getItem(key);
		return serializedState === null ? undefined : JSON.parse(serializedState);
	} catch (error) {
		console.error('Get state error: ', error.message);
	}
};

const localStorageFormValuesKey = 'formValues(hw-06)';

export { saveDataToLocalSt, loadDataFromLocalSt, localStorageFormValuesKey };
