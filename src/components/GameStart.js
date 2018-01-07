import React from 'react';
import { browserHistory } from 'react-router';
import localforage from 'localforage';
import TextField from 'material-ui/TextField';
import Header from './Header';
import FlatButton from 'material-ui/FlatButton';
import '../styles/GameStart.css';
import { orange500, blue500, amber400 } from 'material-ui/styles/colors';

const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: orange500,
    },
    floatingLabelStyle: {
        color: amber400,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
};

export default class GameStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            errorText: ""
        }
    }
    submit() {
        if (this.state.name !== null && this.state.name !== "") {
            this.setState({
                errorText: ""
            });
            localforage.setItem('playerName', this.state.name).then((value) => {
                console.log("Value set in localforage: ", value);
                browserHistory.push("/gameplay")
            }).catch((err) => {
                console.log("Error while storing name");
                this.setState({ errorText: err });
            })

        } else {
            this.setState({
                errorText: "Please enter your name"
            })
        }
    }
    render() {
        return (
            <div className="main">
                <Header />
                <div className="content">
                    <TextField
                        floatingLabelText="Name"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        errorText={this.state.errorText}
                        onChange={(event) => { this.setState({ name: event.target.value.trim() }) }}
                    />
                    <br />
                    <FlatButton label="Enter" onClick={this.submit.bind(this)} />
                </div>
            </div>
        )
    }
}