import React from 'react';
import validator from 'validator';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onEmailChange = (event) => {
        document.getElementById('emailexists').style.display = "none";
        var email = event.target.value;

        if (!validator.isEmail(email)) {
            document.getElementById('invalidemail').style.display = "block";
        }
        else {
            document.getElementById('invalidemail').style.display = "none";
            this.setState({ email: email })
        }
    }

    onPasswordChange = (event) => {
        var password = event.target.value;

        if (password.length < 8) {
            document.getElementById('invalidpasswordlength').style.display = "block";
        }
        else {
            document.getElementById('invalidpasswordlength').style.display = "none";
        }

        if (! /\d/.test(password)) {
            document.getElementById('invalidpasswordnumber').style.display = "block";
        }
        else {
            document.getElementById('invalidpasswordnumber').style.display = "none";
        }

        this.setState({ password: password })
    }

    onSubmitSignUp = () => {
        var validLogin = true;

        if (!(validator.isEmail(this.state.email))) {
            document.getElementById('invalidemail').style.display = "block";
            validLogin = false;
        }

        if (this.state.password.length < 8) {
            document.getElementById('invalidpasswordlength').style.display = "block";
            validLogin = false;
        }

        if (! /\d/.test(this.state.password)) {
            document.getElementById('invalidpasswordnumber').style.display = "block";
            validLogin = false;
        }

        if (!validLogin) {
            return;
        }

        fetch('https://magicfacedetectorbackend.herokuapp.com/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .catch(err => console.log(err))
            .then(response => response.json())
            .then(user => {
                console.log('user here is ', user)
                if (user[0].id) {
                    this.props.loadUser(user[0])
                    this.props.onRouteChange('home');
                }
                else {
                    console.log("user", user)
                    document.getElementById('emailexists').style.display = "block";
                }
            })
            .catch(err => console.log(err))
    }

    onEnterPress = (key) => {
        if (key.keyCode === 13) {
            this.onSubmitSignUp();
        }
    };

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w5 w-70-m w-30-l mw7 center ma4 mt0 br2 shadow-2">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                                <input
                                    className="b pa2 input-reset ba b--black bg-transparent hover-black w5"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                    onKeyDown={this.onEnterPress}
                                />
                            </div>
                            <form className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input
                                    className="b pa2 input-reset ba b--black bg-transparent hover-black w5"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    onKeyDown={this.onEnterPress}
                                />
                            </form>
                            <div id='invalidemail' className='dn pa0 ma0'>
                                <p>Please enter a valid email address</p>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba b--black bg-transparent hover-black w5"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    onKeyDown={this.onEnterPress}
                                />
                            </div>
                            <div id='invalidpasswordlength' className='dn pa0 ma0'>
                                <p>Your password must contain atleast eight characters</p>
                            </div>
                            <div id='invalidpasswordnumber' className='dn pa0 ma0'>
                                <p>Your password must contain atleast one number</p>
                            </div>
                            <div id='emailexists' className='dn'>
                                <p>This account has already been registered</p>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignUp}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                type="submit"
                                value="Sign Up" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignUp;