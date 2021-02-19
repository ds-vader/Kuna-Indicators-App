import { indicatorAPI } from '../API/api'
import { kunaAPI } from '../API/api'

// action names
const SET_INDICATORS = 'SET_INDICATORS';
const DELETE_INDICATOR = 'DELETE_INDICATOR';
const ADD_NEW_INDICATOR = 'ADD_NEW_INDICATOR';

const SET_PAIRS = 'SET_PAIRS';

let initialState = {
    indicators: [],
    pairs: []
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

        case SET_PAIRS:
            return{ ...state, pairs: action.pairs}

        default:
            return state;
    }
}

//actionCreators
const setIndicators = (indicators) => ({ type: SET_INDICATORS, indicators })
const deleteIndicatorSuccess = (indicatorId) => ({ type: DELETE_INDICATOR, indicatorId })
const addNewIndicatorSuccess = (newIndicator) =>({type: ADD_NEW_INDICATOR, newIndicator})

const setPairs = (pairs) => ({type: SET_PAIRS, pairs})

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
    return (dispatch) =>{
        indicatorAPI.addIndicator(newIndicator)
            .then(response =>{
                dispatch(addNewIndicatorSuccess(response.data))
            })
    }
}

//get pairs
export const getPairs = () =>{
    let resultArr = [];
    return (dispatch) => {
        kunaAPI.getAllMarkets().then(data => {
            data.forEach(item =>{
                let pair = item.base_unit + ' - ' + item.quote_unit
                resultArr.push(pair.toUpperCase())
            })
            dispatch(setPairs(resultArr))
        })
    }
}

export default indicatorReducer;
