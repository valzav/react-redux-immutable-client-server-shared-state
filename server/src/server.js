import Server from "socket.io";
import {createStore} from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const io = new Server().attach(7070);

store.subscribe(
    () => io.emit("state", store.getState().toJS())
);

io.on("connection", (socket) => {
    socket.emit("state", store.getState().toJS());
    socket.on("action", store.dispatch.bind(store));
});
