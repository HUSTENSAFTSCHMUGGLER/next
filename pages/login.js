import React, { useEffect } from 'react'
import { getProviders, getSession } from 'next-auth/react'
import BtnLogin from '../components/btn'
import Router from 'next/router'
import $ from 'jquery'

//ICONS
import { faGooglePlus, faFacebook, faGithub, faReddit } from '@fortawesome/free-brands-svg-icons'

const Login = ({ getProviders, getSession }) => {
    useEffect(() => {
        if(getSession) return Router.push('/')
    })

	if (getSession) return null;

	const handleSignIn = (e) => {
		$("#container").removeClass("right-panel-active");
	}

	const handleSignUp = (e) => {
		$("#container").addClass("right-panel-active");
	}
    
	return (
		<div className="container" id="container">
			<div className="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>
					<div className="social-container flex">
						<BtnLogin getProviders={getProviders.google} icon={faGooglePlus}/>
						<BtnLogin getProviders={getProviders.facebook} icon={faFacebook}/>
						<BtnLogin getProviders={getProviders.github} icon={faGithub}/>
						<BtnLogin getProviders={getProviders.reddit} icon={faReddit}/>
					</div>
					<span>or use your email for registration</span>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button className="loginButton loginext">Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>
					<div className="social-container flex">
						<BtnLogin getProviders={getProviders.google} icon={faGooglePlus}/>
						<BtnLogin getProviders={getProviders.facebook} icon={faFacebook}/>
						<BtnLogin getProviders={getProviders.github} icon={faGithub}/>
						<BtnLogin getProviders={getProviders.reddit} icon={faReddit}/>
					</div>
					<span>or use your account</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button className="loginButton loginext">Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button className="loginButton ghost loginext" onClick={handleSignIn} id="signIn">Sign In</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button className="loginButton ghost loginext" onClick={handleSignUp} id="signUp">Sign Up</button>
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