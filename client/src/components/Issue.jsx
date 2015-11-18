import React from "react";
import {connect} from "react-redux";
import {issueAction} from "../client_actions";

class Issue extends React.Component {
    issue(e) {
        e.preventDefault();
        this.props.dispatch(issueAction(this.refs.issue_to.value, this.refs.amount.value, this.refs.symbol.value));
    }
    render() {
        return <div>
            <h4>Issue Asset</h4>
            <form className="form-inline" onSubmit={this.issue.bind(this)}>
                <div className="form-group">
                    <input className="form-control" type="text" ref="issue_to" placeholder="To"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="amount" placeholder="Amount"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="symbol" placeholder="Currency" defaultValue="USD"/>
                </div>
                <button type="submit" className="btn btn-default">Issue</button>
            </form>
            <hr/>
        </div>;
    }
}

export default Issue;
