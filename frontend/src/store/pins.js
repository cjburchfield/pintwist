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

// export const createPin = (userId, pin) => async(dispatch) => {
//     const response = await csrfFetch(`/api/users/${userId}/pins/`, {
//         method: "POST",
//         // headers: {"Content-Type": "application/json"},
//         // body: JSON.stringify(pin)
//         body: pin
//     })

//     if (response.ok) {
//         const newPin = await response.json();
//         dispatch(receivePin(newPin))
//     }
// }

// export const createPin = (userId, pin) => async (dispatch) => {
//     const formData = new FormData();
//     formData.append("title", pin.title);
//     formData.append("description", pin.description);
//     formData.append("destination_link", pin.destination_link);
//     formData.append("pin_photo", pin.photo);
  
//     const response = await csrfFetch(`/api/users/${userId}/pins/`, {
//       method: "POST",
//       body: formData,
//     });
  
//     if (response.ok) {
//       const newPin = await response.json();
//       dispatch(receivePin(newPin));
//     }
//   };
  
// export const createPin = (pin) => async (dispatch) => {
//     const formData = new FormData();
//     formData.append("title", pin.title);
//     formData.append("description", pin.description);
//     formData.append("destination_link", pin.destination_link);
//     formData.append("pin_photo", pin.pin_photo);
  
//     const response = await csrfFetch(`/api/pins/`, {
//       method: "POST",
//       body: formData,
//     });
  
//     if (response.ok) {
//       const newPin = await response.json();
//       dispatch(receivePin(newPin));
//       return newPin;
//     } else {
//       console.log("Failed to create pin");
//     }
//   };
  
// export const createPin = ({ title, description, destination_link }) => async dispatch => {
    // console.log(title)
    // console.log(description)
    // console.log(destination_link)
//     export const createPin = (pin) => async dispatch => {

//     const formData = new FormData();
//     formData.append('pin[title]', pin.title)
//     formData.append('pin[description]', pin.description);
//     formData.append('pin[destination_link]', pin.destination_link);
    
//     const response = await csrfFetch(`/api/pins`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data", // set content type to multipart form data
//       },
//       body: formData
//     });
//     console.log(response)
//     debugger
//     if (response.ok) {
//         const newPin = await response.json();
//         dispatch(receivePin(newPin));
//     }
//   };
export const createPin = ({ title, description, destination_link, user_id}) => async dispatch => {

// export const createPin = (pin) => async dispatch => {
    console.log(title)
    // console.log(pin.title)
    // debugger

    const formData = new FormData();
    formData.append('pin[title]', title)
    // console.log(formData)
    // debugger
    formData.append('pin[description]', description);
    formData.append('pin[destination_link]', destination_link);
    formData.append('user_id', user_id); // add user_id to form data
    // formData.append('pin[title]', pin.title)
    // formData.append('pin[description]', pin.description);
    // formData.append('pin[destination_link]', pin.destination_link);
    // formData.append('user_id', pin.user_id); // add user_id to form data
    
    const response = await csrfFetch(`/api/pins`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data", // set content type to multipart form data
      },
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