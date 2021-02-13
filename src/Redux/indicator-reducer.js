import { indicatorAPI } from '../API/api'

// action names
const SET_INDICATORS = 'SET_INDICATORS';
const DELETE_INDICATOR = 'DELETE_INDICATOR';
const ADD_NEW_INDICATOR = 'ADD_NEW_INDICATOR';

let initialState = {
    indicators: []
}

//reducer for all indicators actions
const indicatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INDICATORS:
            return { ...state, indicators: action.indicators }

        case DELETE_INDICATOR:
            return {
                ...state,
                indicators: state.indicators.filter(i => i.id !== action.indicatorId)
            }

        case ADD_NEW_INDICATOR:
            return {
                ...state,
                indicators: state.indicators.concat(action.newIndicator)
                //indicators: [...state.indicators, action.newIndicator]
            }

        default:
            return state;
    }
}

//actionCreators
const setIndicators = (indicators) => ({ type: SET_INDICATORS, indicators })
const deleteIndicatorSuccess = (indicatorId) => ({ type: DELETE_INDICATOR, indicatorId })
const addNewIndicatorSuccess = (newIndicator) =>({type: ADD_NEW_INDICATOR, newIndicator})

//thunks
//get indicators thunk
export const getIndicators = () => {
    return (dispatch) => {
        indicatorAPI.getIndicators().then(data => {
            dispatch(setIndicators(data))
        })
    }
}

//delete indicator thunk
export const deleteIndicator = (indicatorId) => {
    return (dispatch) => {
        indicatorAPI.deleteIndicator(indicatorId)
            .then(response => {
                if (response.status === 200) {
                    dispatch(deleteIndicatorSuccess(indicatorId))
                }
            })
    }
}

//add indicator thunk
export const addNewIndicator = (newIndicator) =>{
    
    //task
    //get actual start and current values based on pair type
    //return finished new indicator
    //...
    return (dispatch) =>{
        indicatorAPI.addIndicator(newIndicator)
            .then(response =>{
                dispatch(addNewIndicatorSuccess(response.data))
            })
    }
}

export default indicatorReducer;
