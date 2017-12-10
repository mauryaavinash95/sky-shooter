import React from 'react';
import '../styles/Header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="titleBar">
                <div className="title">
                    <h3>Space Shooter</h3>
                </div>
            </div>
        );
    }
}