import React from 'react'
import { signIn } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BtnLogin = ({ getProviders, icon }) => {
    return (
        <div>
            <a
                className="social loginext"
                onClick={() => signIn(getProviders.id)}>
                <FontAwesomeIcon icon={icon}/>
            </a>
        </div>
    )
}

BtnLogin.defaultProps = {
    txtColor: '#EEE'
}

export default BtnLogin