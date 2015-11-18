import React from "react";
import {connect} from "react-redux";
import {transferAction} from "../client_actions";

class Transfer extends React.Component {
    transfer(e) {
        e.preventDefault();
        this.props.dispatch(transferAction(this.refs.from.value, this.refs.to.value,  this.refs.amount.value, this.refs.symbol.value));
    }
    render() {
        return <div>
            <h4>Transfer</h4>
            <form className="form-inline" onSubmit={this.transfer.bind(this)}>
                <div className="form-group">
                    <input className="form-control" type="text" ref="from" placeholder="From"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="to" placeholder="To"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="amount" placeholder="Amount"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="symbol" placeholder="Currency" defaultValue="USD"/>
                </div>
                <button type="submit" className="btn btn-default">Transfer</button>
            </form>
        </div>;
    }
}

export default Transfer;
