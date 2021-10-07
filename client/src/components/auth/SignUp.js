import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import AuthService from '../../services/auth.service';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errmsg: '',
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.validator = this.validator.bind(this);
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    validator = (e) => {
        e.preventDefault();
        if (this.state.username.length < 8) {
            this.setState({ errmsg: 'username too short' });
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({ errmsg: 'password too short' });
            return;
        }

        AuthService.register(this.state.username, this.state.email, this.state.password)
            .then(() => {
                alert("You have been successfully registered!");
                this.props.signup();
            })
            .catch(() => {
                alert("You have been registered... Probably");
            })
    }
    render() {
        const noStyleButton = {
            backgroundColor: 'transparent',
            color: 'inherit',
            border: 'none',
            outline: 'inherit'
        }
        return (
            <div>
                <div style={{ padding: '2rem 0 1rem 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={noStyleButton} onClick={this.props.loginClose}>
                        <IoCloseOutline style={{ fontSize: '1.5rem' }} />
                    </button>
                </div>

                <Form onSubmit={this.validator}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="pe-5" name="username" onChange={this.onChangeHandler} value={this.state.username} type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="pe-5" name="email" onChange={this.onChangeHandler} value={this.state.email} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="pe-5" name="password" onChange={this.onChangeHandler} value={this.state.password} type="password" placeholder="Password" />
                        {this.state.errmsg !== "" ? <p style={{ color: 'red' }}>{this.state.errmsg}</p> : ""}
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className="px-5" variant="primary" size="lg" type="submit">
                            Register
                        </Button>
                    </div>

                </Form>
            </div>
        )
    }
}
