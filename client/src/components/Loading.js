import React, { Component } from 'react';
import {Spinner} from 'react-bootstrap';

export default class Loading extends Component {
    render() {
        return (
            <div className="spinner" style={center}>
                <Spinner animation="border" variant="warning" />
            </div>
        )
    }
}

const center = {
    position: 'absolute',
    left: "50%",
    top: "50%",
    '- webkit - transform': 'translate(-50 %, -50 %)',
    transform: 'translate(-50 %, -50 %)',
}
