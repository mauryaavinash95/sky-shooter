import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import localforage from 'localforage';
import { browserHistory } from 'react-router';
import '../styles/Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: this.props.playerName
        }
    }

    componentWillReceiveProps(newProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
            this.setState({
                playerName: newProps.playerName
            })
        }
    }

    logout() {
        localforage.clear()
            .then(() => {
                console.log("Logout successful");
            }).catch((err) => {
                console.log("Error while clearing localforage", err);
            })
        browserHistory.push("/");
    }

    render() {
        return (
            <div className="titleBar">
                {
                    this.state.playerName ?
                        <div className="playerName">
                            {this.state.playerName}
                        </div>
                        :
                        undefined
                }
                <div className="title">
                    <h3>Sky Shooter</h3>
                </div>
                {this.state.playerName ?
                    (
                        <div className="logout">
                            <FlatButton label="Logout" onClick={this.logout.bind(this)} />
                        </div>
                    )
                    :
                    undefined
                }
            </div>
        );
    }
}