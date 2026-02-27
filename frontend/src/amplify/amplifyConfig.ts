import { Amplify } from 'aws-amplify'

const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID || ''
const userPoolClientId = import.meta.env.VITE_COGNITO_APP_CLIENT_ID || ''
const domain = import.meta.env.VITE_COGNITO_DOMAIN || ''

const config = {
  Auth: {
    region,
    userPoolId,
    userPoolWebClientId: userPoolClientId,
    oauth: domain
      ? {
          domain,
          scope: ['email', 'openid', 'profile'],
          redirectSignIn: window.location.origin + '/login',
          redirectSignOut: window.location.origin + '/login',
          responseType: 'code'
        }
      : undefined
  }
}

Amplify.configure(config)
export default config
