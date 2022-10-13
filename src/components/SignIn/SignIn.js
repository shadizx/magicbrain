import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    console.log('error');
                    document.getElementById('invalidlogin').style.display = "block";
                }
            })
    }

    onEnterPress = (key) => {
        if (key.keyCode === 13) {
            this.onSubmitSignIn();
        }
    };

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w5 w-70-m w-30-l mw7 center ma4 mt0 br2 shadow-2">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input
                                    className="b pa2 input-reset ba b--black bg-transparent hover-black w5"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    onKeyDown={this.onEnterPress}
                                />
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
                            <div id='invalidlogin' className='dn'>
                                <p>Invalid email or password</p>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                type="submit"
                                value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('SignUp')} className="f5 link dim black db pointer w-30 center">Sign Up</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;