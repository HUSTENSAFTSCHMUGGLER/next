import React from 'react'
import { signIn } from 'next-auth/react'

const BtnLogin = ({ getProviders, btncontent }) => {
    return (
        <div>
            <a
                class="social"
                onClick={() => signIn(getProviders.id)}
                value={() => btncontent}>
            </a>
        </div>
    )
}

BtnLogin.defaultProps = {
    txtColor: '#EEE'
}

export default BtnLogin