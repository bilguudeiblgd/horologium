
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import "./LoginPopUp.css"
import AuthService from '../services/auth.service.js';
import SignUp from './auth/SignUp.js'
export default class LoginPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errmsg: '',
            signup: false,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.summonSignUp = this.summonSignUp.bind(this);
        this.closeSignUp = this.closeSignUp.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler(e) {
        e.preventDefault();

        AuthService.login(this.state.email, this.state.password)
            .then(() => {
                this.props.loginClose();
                this.setState({ email: '', password: '' })
            })
            .catch(err => { console.log(err) });

    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    summonSignUp() {
        this.setState({ signup: true });
    }
    closeSignUp(){
        this.setState({signup: false});
    }
    render() {
        return (
            <div>
                <div className="login-container">
                    {this.state.signup
                        ? <SignUp loginClose={this.props.loginClose} signup = {this.closeSignUp}/>
                        :
                        <div>
                            <div style={{ padding: '2rem 0 1rem 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <button style={noStyleButton} onClick={this.props.loginClose}>
                                    <IoCloseOutline style={{ fontSize: '1.5rem' }} />
                                </button>
                            </div>

                            <Form onSubmit={this.submitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control className="pe-5" name="email" onChange={this.onChangeHandler} value={this.state.email} type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className="pe-5" name="password" onChange={this.onChangeHandler} value={this.state.password} type="password" placeholder="Password" />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={this.summonSignUp} variant="transparent" style={{ color: "grey", padding: '0' }}>Signup</Button>
                                </Form.Group>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button className="px-5" variant="primary" size="lg" type="submit">
                                        LOGIN
                    </Button>
                                </div>

                            </Form>
                        </div>
                    }
                </div>
            </div>


        )

    }

}

const noStyleButton = {
    backgroundColor: 'transparent',
    color: 'inherit',
    border: 'none',
    outline: 'inherit'
}