import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'

const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const AccountDashboard = lazy(() => import('./pages/AccountDashboard'))
const TransactionHistory = lazy(() => import('./pages/TransactionHistory'))

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/account/:accountId" element={<ProtectedRoute><AccountDashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/account/acc_123" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
