import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import axios from 'axios'


export const Login: React.FC = () => {
  const fetchAuthUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/user', {
        withCredentials: true,
      })

      if (response && response.data) {
        console.log('User: ', response.data)
      }
    } catch (err: any) {
      console.log('Not properly authenticated ', err.message)
    }
  }

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null
    const googleLoginUrl = 'http://localhost:3001/auth/google'
    const newWindow = window.open(
      googleLoginUrl,
      '_blank',
      'width=500,height=600'
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated")
          fetchAuthUser()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  return (
    <div className='login'>
      <Fragment>
        <Link to="/login/google">
          <GoogleButton onClick={redirectToGoogleSSO} />
        </Link>
      </Fragment>
    </div>
  )
}
