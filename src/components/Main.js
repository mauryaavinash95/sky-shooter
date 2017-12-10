import React from 'react';

import Header from './Header';
import '../styles/Main.css';

const bulletThrowInterval = 10000;
const bulletSpeedInterval = 500;
const bulletSpeedSize = 10;
const enemiesThrowInterval = 10000;
const enemiesSpeedInterval = 500;
const enemiesSpeedSize = 10;
const collisionCheckInterval = 5000;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            playerStyle: {
                left: 0
            },
            bulletX: [],
            bulletY: [],
            enemiesX: [],
            enemiesY: [],
        }
    }

    componentDidMount() {
        this.fire();
    }

    fire() {
        setInterval(() => {
            if (!this.state.pause)
                this.generateBullet();
        }, bulletThrowInterval);

        setInterval(() => {
            if (!this.state.pause)
                this.updatebulletY();
        }, bulletSpeedInterval);

        setInterval(() => {
            if (!this.state.pause)
                this.generateEnemies();
        }, enemiesThrowInterval)

        setInterval(() => {
            if (!this.state.pause)
                this.updateEnemiesY();
        }, enemiesSpeedInterval);

        setInterval(() => {
            if (!this.state.pause)
                this.checkCollisions();
        }, collisionCheckInterval)
    }

    generateBullet() {
        let { bulletX, bulletY } = this.state;
        let rectCoordinates = this.refs.gameRegion.getBoundingClientRect();
        bulletX.push(this.state.playerStyle.left);
        bulletY.push(rectCoordinates.bottom - 100);
        this.setState({ bulletX, bulletY });
    }

    generateEnemies() {
        let { enemiesX, enemiesY } = this.state;
        let rectCoordinates = this.refs.gameRegion.getBoundingClientRect();
        let width = Math.floor(rectCoordinates.width);
        enemiesX.push(Math.floor(Math.random() * width) + 1);
        enemiesY.push(0);
        this.setState({ enemiesX, enemiesY });
    }

    mouseMove(event) {
        let rectCoordinates = this.refs.gameRegion.getBoundingClientRect();
        let left = rectCoordinates.left;
        let x = event.clientX - left;
        this.setState({
            playerStyle: { left: x }
        })
    }

    updatebulletY() {
        let { bulletY } = this.state;
        for (let i = 0; i < bulletY.length; i++) {
            if (bulletY[i] > -bulletSpeedSize)
                bulletY[i] = bulletY[i] - bulletSpeedSize;
        }
        this.setState({ bulletY });
    }

    updateEnemiesY() {
        let { enemiesY } = this.state;
        for (let i = 0; i < enemiesY.length; i++) {
            if (enemiesY[i] > -enemiesSpeedSize)
                enemiesY[i] = enemiesY[i] + enemiesSpeedSize;
        }
        this.setState({ enemiesY });
    }

    renderBullets() {
        return this.state.bulletX.map((value, index, array) => {
            let top = (this.state.bulletY[index] + "px").toString();
            let left = (this.state.bulletX[index] + "px").toString();
            if (this.state.bulletY[index] > 0) {
                return (
                    <div style={{ position: 'absolute', left: left, top: top }}>
                        {top}
                    </div>
                )
            }
        }, this);
    }

    renderEnemies() {
        return this.state.enemiesX.map((value, index, array) => {
            let top = (this.state.enemiesY[index] + "px").toString();
            let left = (value + "px").toString();
            if (this.state.enemiesY[index] < 590) {
                return (
                    <div style={{ position: 'absolute', left: left, top: top }}>
                        {top}
                    </div>
                )
            }
        }, this);
    }

    gamePause() {
        this.setState({
            pause: !this.state.pause,
        })
    }

    checkCollisions() {
        let { bulletX, bulletY, enemiesX, enemiesY } = this.state;
        let i, j;
        //  let bullet = [];
        // let enemies = [];
        // let tempBullet = {};
        // let tempEnemy = {};

        // for (i = 0; i < bulletX.length; i++) {
        //     tempBullet.x = bulletX[i];
        //     tempBullet.y = bulletY[i];
        //     bullet.push(tempBullet);
        // }
        // for (i = 0; i < enemiesX.length; i++) {
        //     tempEnemy.x = enemiesX[i];
        //     tempEnemy.y = enemiesY[i];
        //     enemies.push(tempEnemy);
        // }

        for (i = 0; i < bulletX.length; i++) {
            let bx = bulletX[i];
            let by = bulletY[i];
            if (bulletY[i] > 0) {
                for (j = 0; j < enemiesX.length; j++) {
                    let ex = enemiesX[j];
                    let ey = enemiesY[j];
                    console.log("Checking ", bx, ex);
                    console.log("Checking ", by, ey);
                    if (Math.abs(bx - ex) < 50 && Math.abs(by - ey) < 50) {
                        console.log("Killing");
                    }
                }
            }
        }

    }

    render() {
        return (
            <div className="mainContainer">
                <Header />
                <div className="main">
                    <div className="profile">
                    </div>
                    <div className="game" ref="gameRegion" onMouseMove={this.mouseMove.bind(this)}>
                        <div style={{ position: "relative" }}>
                            {this.renderEnemies()}
                            {this.renderBullets()}
                        </div>
                        <div ref="playerRegion" className="playerRegion" >
                            <div ref="player" className="player" style={{ left: (this.state.playerStyle.left + "px").toString() }}> [*] </div>
                        </div>
                    </div>
                    <div className="controls">
                        <button onClick={this.gamePause.bind(this)}>Pause</button>
                    </div>
                </div>
            </div>
        )
    }
}