import React from 'react';
// import Header from '../components/Header';
import Main from '../components/Main';
import GameStart from '../components/GameStart';
import GamePlay from '../components/GamePlay';
import GameOver from '../components/GameOver';
import NotFound from '../components/NotFound';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                {/* <IndexRoute component={Header} /> */}
                <Route component={Main}>
                    <Route component={GameStart} path="/" />
                    <Route component={GamePlay} path="/gameplay" />
                    <Route component={GameOver} path="/gameover" />
                    <Route component={NotFound} path="*" />
                </Route>
            </Router>
        )
    }
}