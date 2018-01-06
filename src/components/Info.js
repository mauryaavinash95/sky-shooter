import React from 'react';
import '../styles/Info.css';


export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score,
            lives: this.props.lives,
            livesImage: this.showLives(this.props.lives)
        }
    }

    componentWillReceiveProps(newProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
            // console.log("Got new Props in Info.js as ", newProps);
            this.setState({
                score: newProps.score,
                lives: newProps.lives,
                livesImage: this.showLives(newProps.lives),
            })
        }
    }

    showLives(lives) {
        let jsx = [];
        for (let i = 0; i < lives; i++) {
            jsx.push((
                <div>
                    <img src="assets/images/spaceship.png" className="playerImage" />
                </div>
            ));
        }
        return jsx;
    }

    render() {
        return (
            <div className="info">
                <div className="infoChild">Score: {this.state.score} </div>
                <div className="infoLives"> {this.state.livesImage} </div>
            </div>
        )
    }
}