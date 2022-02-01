import React, { useEffect } from 'react'
import { getProviders, getSession } from 'next-auth/react'
import BtnLogin from '../components/btn'
import Router from 'next/router'

const Login = ({ getProviders, getSession }) => {
    useEffect(() => {
        if(getSession) return Router.push('/')
    })

	if (getSession) return null;

	const handleSignIn = (e) => {
		const container = document.getElementById('container');
		container.classList.remove("right-panel-active");
	}

	const handleSignUp = (e) => {
		const container = document.getElementById('container');
		container.classList.add("right-panel-active");
	}
    
	return (
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>
					<div class="social-container">
						<BtnLogin getProviders={getProviders.google}/>
						<BtnLogin getProviders={getProviders.facebook}/>
						<BtnLogin getProviders={getProviders.github}/>
						<BtnLogin getProviders={getProviders.reddit}/>
					</div>
					<span>or use your email for registration</span>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button class="loginButton">Sign Up</button>
				</form>
			</div>
			<div class="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>
					<div class="social-container">
						<BtnLogin getProviders={getProviders.google} btncontent="te1"/>
						<BtnLogin getProviders={getProviders.facebook} btncontent="te2"/>
						<BtnLogin getProviders={getProviders.github} btncontent="te3"/>
						<BtnLogin getProviders={getProviders.reddit} btncontent="te4"/>
					</div>
					<span>or use your account</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button class="loginButton">Sign In</button>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button class="loginButton ghost" onClick={handleSignIn} id="signIn">Sign In</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button class="loginButton ghost" onClick={handleSignUp} id="signUp">Sign Up</button>
					</div>
				</div>
			</div>
		</div >
    )
}

Login.getInitialProps = async (context) => {
    return {
        getProviders: await getProviders(context),
        getSession: await getSession(context)
    }
}

export default Login