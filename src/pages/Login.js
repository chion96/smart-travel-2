import React, { Component } from 'react';
import { 
	TextField,
	Button
} from '@material-ui/core';
import './css/Login.css';

class Login extends Component {
	constructor(props) {
	    super(props);
		this.state = { 
		  	mode: 0
		};
	}	

    render() {
    	const { mode } = this.state;
        return (
        	<div>
	        	{mode === 0 && (
	        		<div className="login">
		                  <div className="content">
		                      <TextField
		                          id="standardInput"
		                          label="Membership No. / Email"
		                          margin="normal"
		                      />
		                      <TextField
		                          id="standardInput"
		                          label="Password"
		                          type="password"
		                          autoComplete="current-password"
		                          margin="normal"
		                      />
		                      <div className="buttons">
		                          <Button variant="outlined" className="signInButton">
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
	        	)}
	        	{mode === 1 && (
	        		<div className="login1">
		                <div className="content1">
		                  <div className="">
		                    <TextField
		                    id="standardInput"
		                    label="Family Name"
		                    margin="normal"
		                    />
		                    <TextField
		                        id="standardInput"
		                        label="Given Name"
		                        margin="normal"
		                    />
		                  </div>

		                    <div className="">
		                        <TextField
		                            id="standardInput"
		                            label="Booking Reference"
		                            margin="normal"
		                        />
		                        <div style={{color: 'darkGrey'}}>Or</div>
		                        <TextField
		                            id="standardInput"
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
	        	)}
	        </div>
        );
    }
}

export default Login;