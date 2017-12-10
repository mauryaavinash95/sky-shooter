import React from 'react';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStyle: {
                top: "20px",
                left: "20px",
            }
        }
    }

    mouseMove(event) {
        let x = event.clientX;
        let y = event.clientY;
        this.setState({
            playerStyle: {
                top: (x + "px").toString(),
                left: (y + "px").toString(),
            }
        });
        console.log("Setting coordinates of player to : ", x, y)
    }

    render() {
        return (
            <div style={{ position: 'relative' }}>
                <div onMouseMove={this.mouseMove.bind(this)} >
                    Hello this is main

                </div>
                <div ref="player" style={{ position: 'absolute', backgroundColor: "red", height: '50px', top: this.state.playerStyle.top }}> PLAYER </div>
            </div>
        )
    }
}