import React from 'react'
import { signIn } from 'next-auth/react'

const BtnLogin = ({ getProviders, bgColor, txtColor }) => {
    return (
        <div>
            <button className="btn w-100 my-2 py-3"
                style={{ background: `${bgColor}`, color: `${txtColor}` }}
                onClick={() => signIn(getProviders.id)}>
                Sign in with { getProviders.name }
            </button>
        </div>
    )
}

BtnLogin.defaultProps = {
    txtColor: '#EEE'
}

export default BtnLogin