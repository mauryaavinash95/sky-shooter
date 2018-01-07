import React from 'react';
import Dialog from 'material-ui/Dialog';
import '../styles/Info.css';

const message = (
    <div>
        <p> Press 'Spacebar' to release bullets</p>
        <p> Press 'B' to release blaster</p>
        <p> Press 'Enter' to Play/Pause</p>
        <p> Press 'Esc' to close this dialog </p>
    </div>
);

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
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

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    showLives(lives) {
        let jsx = [];
        for (let i = 0; i < lives; i++) {
            jsx.push((
                <div>
                    <img src="assets/images/spaceship.png" className="playerImage" alt="P" />
                </div>
            ));
        }
        return jsx;
    }

    render() {
        return (
            <div className="info" >
                <div className="infoChild">Score: {this.state.score}</div>
                <div className="infoLives"> {this.state.livesImage} </div>

                <Dialog
                    title="Controls"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {message}
                </Dialog>
            </div>
        )
    }
}