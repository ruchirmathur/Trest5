import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface Props {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: Props) {
  const user = useSelector((s: RootState) => s.auth.user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
