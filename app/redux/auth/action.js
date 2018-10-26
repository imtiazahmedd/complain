import {firebase} from './../../configs/Firebase'

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const db = firebase.firestore();

export const onLogin = (payload) => {
    return dispatch => {
        db.collection("users").doc(payload.user.uid)
            .onSnapshot((doc) => {
                let user = doc.data();
                console.log("Current data: ", doc.data());
                dispatch({
                    type: LOGIN,
                    payload: {...payload, ...user}
                });
            }, (e) => {
                console.log('Something Went Wrong from onLogin Redux');
            });
    };

};

export const logout = (payload) => {
    type: LOGOUT,
        payload
};