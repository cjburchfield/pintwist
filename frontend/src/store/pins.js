import csrfFetch from "./csrf";

const RECEIVE_PIN = "pins/RECEIVE_PIN";
const RECEIVE_PINS = "pins/RECEIVE_PINS";
const REMOVE_PIN = "pins/REMOVE_PIN";

export const receivePin = (pin) => ({
    type: RECEIVE_PIN,
    pin
})

export const receivePins = (pins) => ({
    type: RECEIVE_PINS,
    pins
})

export const removePin = (pinId) => ({
    type: REMOVE_PIN,
    pinId
})

export const getPin = (pinId) => state => {
    if (state && state.pins) {
        return state.pins[pinId]
    } else {
        return null;
    }
}

export const getPins = (state) => {
    if (state && state.pins) {
        return Object.values(state.pins)
    } else {
        return [];
    }
}

export const fetchAllPins = () => async(dispatch) => {
    const response = await csrfFetch('/api/pins/')

    if (response.ok) {
        const pins = await response.json();
        dispatch(receivePins(pins))
    }
}

export const fetchPin = (pinId) => async(dispatch) => {
    const response = await csrfFetch(`/api/pins/${pinId}`)

    if (response.ok) {
        const pin = await response.json();
        dispatch(receivePin(pin))
    }
}

export const createPin = ({ title, description, destination_link, user_id}) => async dispatch => {

    const formData = new FormData();
    formData.append('pin[title]', title)
    formData.append('pin[description]', description);
    formData.append('pin[destination_link]', destination_link);

    const response = await csrfFetch(`/api/pins`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
        const newPin = await response.json();
        dispatch(receivePin(newPin));
    }
  };

// export const updatePin = (pin) => async(dispatch) => {
//     const response = await csrfFetch(`/api/pins/${pin.id}`, {
//         method: "PATCH",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(pin)
//     })

//     if (response.ok) {
//         const updatedPin = await response.json();
//         dispatch(receivePin(updatedPin));
//     }
// }

// export const deletePin = (pinId) => async(dispatch) => {
//     const response = await csrfFetch(`/api/pins/${pinId}`, {
//         method: "DELETE"
//     })

//     if (response.ok) {
//         dispatch(removePin(pinId));
//     }
// }

const pinsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PIN:
            return {...state, [action.pin.id]: action.pin}
        case RECEIVE_PINS:
            return {...state, ...action.pins}
        case REMOVE_PIN:
            const newState = {...state};
            delete newState[action.pinId];
            return newState;
        default:
            return state;
    }
}

export default pinsReducer;