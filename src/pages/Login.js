/* eslint-disable */
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './css/Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
    }
    state = {
        mode: 0,
        name: '',
        password: ''
    };

    handleChangeName = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangePW = password => event => {
        this.setState({
            [password]: event.target.value,
        });
    };

    async submit() {

        await axios.get(`http://localhost:8080/api/login/${this.state.name}/${this.state.password}`).then(res => {
            console.log(`http://localhost:8080/api/${this.state.name}/${this.state.password}`)
            console.log(res.data);
        });

    };

    componentDidMount(){
        function timeout() {
            setTimeout(function () {
                // Do Something Here
                console.log(Date.now());
                timeout();
            }, 1000);
        }
        timeout();
    }

    render() {

        if (this.state.mode === 0) {
            return (
                <div className="login">
                    <div className="content">
                        <TextField
                            className="standardInput"
                            label="Membership No. / Email"
                            margin="normal"
                            value={this.state.name}
                            onChange={this.handleChangeName('name')}
                        />
                        <TextField
                            className="standardInput"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.handleChangePW('password')}
                        />
                        <div className="buttons">
                            <Button variant="outlined" className="signInButton" onClick={() => {this.submit()}}>
                                Sign In
                            </Button>

                            <Button variant="outlined" className="signInButton" onClick={() => {this.setState({
                                mode: 1
                            });}}>
                                Sign In With Boarding Pass
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="login1">
                    <div className="content1">
                        <div className="">
                            <TextField
                                className="standardInput"
                                label="Family Name"
                                margin="normal"
                            />
                            <TextField
                                className="standardInput"
                                label="Given Name"
                                margin="normal"
                            />
                        </div>

                        <div className="">
                            <TextField
                                className="standardInput"
                                label="Booking Reference"
                                margin="normal"
                            />
                            <div style={{color: 'darkGrey'}}>Or</div>
                            <TextField
                                className="standardInput"
                                label="E-ticket"
                                margin="normal"
                                style={{marginTop: '0px'}}
                            />
                        </div>

                        <div className="buttons">

                            <Button variant="outlined" className="signInButton" onClick={() => {this.setState({
                                mode: 1
                            });}}>
                                Sign In With Boarding Pass
                            </Button>
                            <Button variant="outlined" className="signInButton" onClick={() => {this.setState({
                                mode: 0
                            });}}>
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}



export default Login;

/* eslint-enable */
