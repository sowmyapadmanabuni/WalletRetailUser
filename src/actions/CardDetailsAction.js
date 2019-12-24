import {UPDATE_CARD_TYPE} from './types';


export const updateCardType = val =>{
    return dispatch =>{
        dispatch({
            type:UPDATE_CARD_TYPE,
            payload:val,
        });
    };
};