export function setClientIdAction(clientId) {
    return {
        type: "SET_CLIENT_ID",
        clientId
    };
}

export function setConnectionStateAction(state, connected) {
    return {
        type: "SET_CONNECTION_STATE",
        state,
        connected
    };
}

export function setStateAction(state) {
    return {
        type: "SET_STATE",
        state,
        meta: {server: true}
    };
}


export function issueAction(to, amount, symbol) {
    return {type: "ISSUE", to, amount, symbol};
}

export function transferAction(from, to, amount, symbol) {
    return {type: "TRANSFER", from, to, amount, symbol};
}
