import React from 'react';
// Need to import Prop-Types library

import '../styles/Instructions.css';

export default class Instructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playPause: this.props.playPause,
        }
    }

    componentWillReceiveProps(newProps) {
        // Check this out, why does it re-render every time even though the pause state is not changed in parent.
        console.log("Got new Props as : ", newProps);
        this.setState({
            playPause: newProps.playPause,
        })
    }

    renderPlayStatus() {
        if (this.state.playPause) {
            return (
                <div>
                    Play
                </div>
            )
        } else {
            return (
                <div>
                    Pause
                </div>
            )
        }
    }

    render() {
        return (
            <div className="instructionsContainer">
                <div className="instructionsHeading">Controls</div>
                <div className="instructionsList">
                    <div className="instruction">Press 'B' to release Blaster.</div>
                    <div className="instruction">Hit 'Spacebar'to {this.renderPlayStatus()}</div>
                </div>
            </div>

        )
    }
}