require("file?name=index.html!./assets/index.html");
require("./assets/app.scss");

import React from "react";
import ReactDOM from "react-dom";
import {compose, createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {devTools} from "redux-devtools";
import {DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";
import server_reducer from "../../server/src/reducer";
import client_reducer from "./client_reducer";
import {setClientIdAction, setStateAction, setConnectionStateAction} from "./client_actions";
import Balances from "./components/Balances";
import Issue from "./components/Issue";
import Transfer from "./components/Transfer";
import uuid from "uuid";
import io from "socket.io-client";

const socket = io(`${location.protocol}//${location.hostname}:7070`);

const remoteActionMiddleware = socket => store => next => action => {
    if (!action.meta || !action.meta.server) {
        const clientId = {clientId: store.getState().client.get("clientId")};
        socket.emit("action", {...action, ...clientId});
    }
    return next(action);
};

const reducers = combineReducers({
    shared: server_reducer,
    client: client_reducer
});

const composedCreateStore = compose(devTools())(createStore);

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(composedCreateStore);

const store = createStoreWithMiddleware(reducers);

let clientId = localStorage.getItem("clientId");
if (!clientId) {
    clientId = uuid.v4();
    localStorage.setItem("clientId", clientId);
}
store.dispatch(setClientIdAction(clientId));

socket.on("state", state => store.dispatch(setStateAction(state)));

["connect", "connect_error", "connect_timeout", "reconnect", "reconnecting", "reconnect_error", "reconnect_failed"].forEach(ev =>
        socket.on(ev, () => store.dispatch(setConnectionStateAction(ev, socket.connected)))
);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <Balances/>
                <Issue dispatch={store.dispatch}/>
                <Transfer dispatch={store.dispatch}/>
            </div>
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
    </div>,
    document.getElementById("content")
);
