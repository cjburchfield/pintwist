import csrfFetch from "./csrf";

const GET_USERS = 'users/GET_USERS';
const GET_USER = 'users/GET_USER'

export const getUsers = (users) => ({
    type: GET_USERS,
    users
})

export const getUser = (user) => ({
    type: GET_USER,
    user
})

export const fetchAllUsers = (users) => async(dispatch) => {
    const response = await csrfFetch('/api/users')

    if (response.ok) {
        const users = await response.json();
        dispatch(getUsers(users))
    }
}

export const fetchUser = (userId) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json();
        dispatch(getUser(user))
    }
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {

    case GET_USERS:
        return { ...state, ...action.users }

    case GET_USER:
        return { ...state, [action.user.id]: action.user}

    default:
        return state;
    }
}

export default usersReducer;
