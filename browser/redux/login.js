import axios from 'axios';

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const FETCH_USER = 'FETCH_USER'
const SUBMIT_ERROR = 'SUBMIT_ERROR'

const setCurrentUser = user => ({
	type: SET_CURRENT_USER, currentUser: user
})

const submitError = () => ({
	type: SUBMIT_ERROR
});

const initialLoginState = {
	currentUser: {},
	error: false
}


export default function reducer (state = initialLoginState , action){

	let newState;

	switch(action.type){
		case SET_CURRENT_USER:
			newState = Object.assign({}, state, {
				currentUser: action.currentUser
			})
			break;

		case SUBMIT_ERROR:
			newState = Object.assign({}, state, {
				error: true
			})
			break;

		default:
			return state;
	}

	return newState;
}



//Dispatchers
export const fetchUser = function(email, password){
	return dispatch => {
		axios.post('/api/login', {email, password})
		.then(r => r.data)
		.then(user => dispatch(setCurrentUser(user)))
		.catch(dispatch(submitError))
	}
}

export const createUser = function(email, password){
	return dispatch => {
		axios.post('/api/users', {email, password})
		.then(r => r.data)
		.then(user => dispatch(setCurrentUser(user)))
		.catch(console.error);
	};
}

export const logOut = () => {
	return dispatch => {
		axios.get('/api/login')
		.then(r => console.log(r))
		.then(() => dispatch(setCurrentUser({})));
	}
}