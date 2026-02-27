import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '../store/authSlice'
import '../amplify/amplifyConfig'

const Container = styled.div`padding:24px;`

export default function Profile() {
  const [user, setLocalUser] = useState<any | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const u = await Auth.currentAuthenticatedUser()
        setLocalUser(u)
        dispatch(setUser(u))
      } catch {
        setLocalUser(null)
        dispatch(clearUser())
      }
    })()
  }, [])

  async function signOut() {
    try {
      await Auth.signOut()
      setLocalUser(null)
      dispatch(clearUser())
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <h2>Profile & MFA</h2>
      {user ? (
        <div>
          <div><strong>Username:</strong> {user.username}</div>
          <div><strong>Attributes:</strong> {JSON.stringify(user.attributes)}</div>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <div>Not signed in. Use /login to authenticate or Cognito Hosted UI.</div>
      )}
    </Container>
  )
}
