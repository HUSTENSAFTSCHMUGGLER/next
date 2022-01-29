import React, { useEffect } from 'react'
import { getProviders, getSession, SessionProvider } from 'next-auth/react'
import BtnLogin from '../components/btn'
import Router from 'next/router'
import Head from 'next/head'

const Login = ({ getProviders, getSession }) => {
    useEffect(() => {
        if(getSession) return Router.push('/')
    })

    if (getSession) return null;
    return (
        <SessionProvider>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous" />
            </Head>
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
        </SessionProvider>
    )
}

Login.getInitialProps = async (context) => {
    return {
        getProviders: await getProviders(context),
        getSession: await getSession(context)
    }
}

export default Login