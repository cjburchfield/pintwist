import csrfFetch from "./csrf";
import { setCurrentUser } from "./session";

const RECEIVE_USERS = 'users/RECEIVE_USERS';
const RECEIVE_USER = 'users/RECEIVE_USER';

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})


export const getUser = (userId) => state => {
    if (state && state.users) {
        return state.users[userId]
    } else {
        return null;
    }
}

export const getUsers = (state) => {
    if (state && state.users) {
        return Object.values(state.users)
    } else {
        return [];
    }
}

export const fetchAllUsers = () => async(dispatch) => {
    const response = await csrfFetch('/api/users/')

    if (response.ok) {
        const users = await response.json();
        dispatch(receiveUsers(users))
    }
}

export const fetchUser = (userId) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`)

    if (response.ok) {
        const {user} = await response.json();
        dispatch(receiveUser(user))
    }
}

export const updateUser = (user) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if (response.ok) {
        const updatedUser = await response.json();
        dispatch(receiveUser(updatedUser));
    }
};


const usersReducer = (state = {}, action) => {
    switch (action.type) {

    case RECEIVE_USERS:
        return { ...state, ...action.users }

    case RECEIVE_USER:
        return { ...state, [action.user.id]: action.user}

    default:
        return state;
    }
}

export default usersReducer;
