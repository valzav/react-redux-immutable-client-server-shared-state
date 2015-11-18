import {createStore} from "redux";
import {Map} from "immutable";

const INITIAL_STATE = Map({balances: Map({})});

function issueAsset(state, to, amount, symbol) {
    return state.updateIn(["balances", to], val => {
        const new_amount = Map({[symbol]: amount});
        return val ? val.merge(new_amount) : new_amount;
    });
}

function transfer(state, from, to, amount, symbol) {
    let balance_from = state.getIn(["balances", from, symbol], 0.0);
    let balance_to = state.getIn(["balances", to, symbol], 0.0);
    if (balance_from < amount) return state;
    balance_from -= amount;
    balance_to += amount;
    return state.withMutations(map => {
        map.updateIn(["balances", from], val => {
            let new_amount = Map({[symbol]: balance_from});
            return val.merge(new_amount);
        });
        map.updateIn(["balances", to], val => {
            const new_amount = Map({[symbol]: balance_to});
            return val ? val.merge(new_amount) : new_amount;
        });
    });
}

function setState(state, newState) {
    return state.merge(newState);
}

export default function reducer(state = INITIAL_STATE, action = undefined) {
    switch (action.type) {
        case "ISSUE":
            return issueAsset(state, action.to, parseFloat(action.amount), action.symbol);
        case "TRANSFER":
            return transfer(state, action.from, action.to, parseFloat(action.amount), action.symbol);
        case "SET_STATE":
            return setState(state, action.state);
    }
    return state;
}
