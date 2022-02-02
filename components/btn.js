import React from 'react'
import { signIn } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BtnLogin = ({ getProviders, icon }) => {
    return (
        <div>
            <a
                className="social loginext fontSize"
                onClick={() => signIn(getProviders.id)}>
                <FontAwesomeIcon icon={icon}/>
            </a>
        </div>
    )
}

export default BtnLogin