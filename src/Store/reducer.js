import * as actionType from './action';

const initialState = {
    ingridiants : {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,   
    },
    totalPrice: 4,
}

const INGRIDIANT_PRICE = {
    salad : 5.5,
    cheese : 10.25,
    meat : 25.7,
    bacon : 15.70
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.ADD_INGREDIANT:
            return {
                ...state,
                ingridiants: {
                    ...state.ingridiants,
                    [action.ingrediantName] : state.ingridiants[action.ingrediantName] + 1
                },
                totalPrice: state.totalPrice + INGRIDIANT_PRICE[action.ingrediantName]
            }

        case actionType.REMOVE_INGREDIANT:
            return{
                ...state,
                ingridiants: {
                    ...state.ingridiants,
                    [action.ingrediantName] : state.ingridiants[action.ingrediantName] - 1
                },
                totalPrice: state.totalPrice - INGRIDIANT_PRICE[action.ingrediantName]
            }
        default:
            return state;

    }
}

export default reducer;