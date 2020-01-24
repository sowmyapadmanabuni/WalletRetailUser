import { UPDATE_USER_INFO,UPDATE_lOGGEDIN } from "./types"

export const updateUserInfo = ({ prop, value }) => {
    console.log("Props & Value:",prop,value)
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_INFO,
            payload: {prop, value}
        })
    }
}

export const updateLoggedIn = ({ prop, value }) => {
    console.log("Props & Value:",prop,value)
    return (dispatch) => {
        dispatch({
            type: UPDATE_lOGGEDIN,
            payload: {prop, value}
        })
    }
}
