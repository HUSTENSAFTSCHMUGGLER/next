import React, { useEffect } from 'react'
import { getProviders, getSession } from 'next-auth/react'
import BtnLogin from '../components/btn'
import Router from 'next/router'

const Login = ({ getProviders, getSession }) => {
    useEffect(() => {
        if(getSession) return Router.push('/')
    })

    if (getSession) return null;
    return (
        <div className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}>
            <div className="border border-1 max-auto p-4 shadow"
            style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center fw-bolder"
                style={{ color: '#555', letterSpacing: '1px'}}>
                    LLOTAN
                </h2>

                <p className="text-center">Sign up to your Account</p>

                <BtnLogin getProviders={getProviders.google} bgColor='#1A73E9' />
                <BtnLogin getProviders={getProviders.facebook} bgColor='#0404BE' />
                <BtnLogin getProviders={getProviders.github} bgColor='#444222' />
                <BtnLogin getProviders={getProviders.reddit} bgColor='#FF4500' />
            </div>
        </div>
    )
}

Login.getInitialProps = async (context) => {
    return {
        getProviders: await getProviders(context),
        getSession: await getSession(context)
    }
}

export default Login