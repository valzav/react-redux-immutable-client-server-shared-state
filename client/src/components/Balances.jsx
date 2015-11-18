import React from "react";
import {connect} from "react-redux";

class Balances extends React.Component {
    render() {
        let balances = Object.keys(this.props.balances).map(name => {
            let my_balances = this.props.balances[name];
            return <li key={name}>{name}
                <ul>{Object.keys(my_balances).map(b => <li key={b}>{my_balances[b]} {b}</li>)}</ul>
            </li>;
        });
        return <div>
            <h4>Balances</h4>
            <ul>
                {balances}
            </ul>
        </div>;
    }
}

export default connect(state => { return {balances: state.shared.get("balances").toJS()}})(Balances);
