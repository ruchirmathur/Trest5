import React, { useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/authSlice'
import '../amplify/amplifyConfig'

const Container = styled.div`
  display:flex;align-items:center;justify-content:center;height:80vh;
`
const Form = styled.form`
  background:white;padding:24px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12);
  width:320px;display:flex;flex-direction:column;gap:8px;
`

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await Auth.signIn(username, password)
      dispatch(setUser(user))
      const session = await Auth.currentSession()
      dispatch(setToken(session.getAccessToken().getJwtToken()))
      navigate('/account/acc_123')
    } catch (err) {
      alert('Login failed: ' + ((err as any).message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h3>Login</h3>
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        <div style={{ fontSize: 12, color: '#666' }}>Or use your Cognito Hosted UI via the Amplify configuration.</div>
      </Form>
    </Container>
  )
}
