import React from 'react';
// import PropTypes;

export default class Bullet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            left: this.props.left,
            right: this.props.right
        }
        console.log(this.props);
    }

    render() {
        return (
            <div key={`bullet_${this.state.index}`} style={{ position: 'absolute', left: this.state.left, top: this.state.top }}>
                *
            </div>
        )
    }
}