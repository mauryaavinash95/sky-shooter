import React from 'react';
import { browserHistory } from 'react-router';
import Header from './Header';
import FlatButton from 'material-ui/FlatButton';

export default class GameOver extends React.Component {
    render() {
        console.log("Not Found");
        return (
            <div className="mainContainer">
                <Header />
                <div className="content">
                    Page Not Found
                    <br />
                    <br />
                    <FlatButton label="Goto Home Page" onClick={
                        () => {
                            browserHistory.push("/");
                        }
                    } />
                </div>
            </div>
        )
    }
}