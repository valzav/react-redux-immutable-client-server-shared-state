import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe("redux", () => {

    describe("reducer", () => {

        it("should return empty state", () => {
            expect(
                reducer(undefined, {}).toJS()
            ).to.deep.equal({balances: {}});
        });

        it("should be able to issue assets", () => {
            let state = reducer(undefined, {type: "ISSUE", to: "alice", amount: 1000, symbol: "USD"});
            state = reducer(state, {type: "ISSUE", to: "alice", amount: 100, symbol: "BTC"});
            expect(
                state.toJS()
            ).to.deep.equal({ balances: { alice: { USD: 1000, BTC: 100 } } });
        });

        it("should be able to transfer asset", () => {
            const state = fromJS({ balances: { alice: { USD: 100 }, bob: {USD: 20} } });
            expect(
                reducer(state, {type: "TRANSFER", from: "alice", to: "bob", amount: 10, symbol: "USD"}).toJS()
            ).to.deep.equal({ balances: { alice: { USD: 90 }, bob: { USD: 30 } } });
        });

        it("should be able to transfer to empty balance", () => {
            const state = fromJS({ balances: { alice: { USD: 100 } } });
            expect(
                reducer(state, {type: "TRANSFER", from: "alice", to: "bob", amount: "10", symbol: "USD"}).toJS()
            ).to.deep.equal({ balances: { alice: { USD: 90 }, bob: { USD: 10 } } });
        });

        it("should be able to transfer twice", () => {
            let state = fromJS({ balances: { alice: { USD: 100 } } });
            state = reducer(state, {type: "TRANSFER", from: "alice", to: "bob", amount: "12", symbol: "USD"});
            state = reducer(state, {type: "TRANSFER", from: "alice", to: "bob", amount: "12", symbol: "USD"});
            expect(
                state.toJS()
            ).to.deep.equal({ balances: { alice: { USD: 76 }, bob: { USD: 24 } } });
        });

        it("should be able to transfer multiple currencies", () => {
            let state = fromJS({ balances: { alice: { USD: 100, BTC: 10 } } });
            state = reducer(state, {type: "TRANSFER", from: "alice", to: "bob", amount: "20", symbol: "USD"});
            state = reducer(state, {type: "TRANSFER", from: "alice", to: "eve", amount: "5", symbol: "BTC"});
            expect(
                state.toJS()
            ).to.deep.equal({ balances: { alice: { USD: 80, BTC: 5 }, bob: { USD: 20 }, eve: {BTC: 5} } });
        });

    });

});
