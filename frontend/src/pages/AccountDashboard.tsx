import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBalanceQuery } from '../store/transactionsApi'
import NavBar from '../components/NavBar'
import styled from 'styled-components'

const Container = styled.div`padding:20px;`

export default function AccountDashboard() {
  const { accountId } = useParams<{ accountId: string }>()
  const accId = accountId || 'acc_123'
  const { data: balance, error, isLoading } = useGetBalanceQuery(accId)

  return (
    <div>
      <NavBar />
      <Container>
        <h2>Account: {accId}</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading balance</div>
        ) : (
          <div>
            <h3>Available Balance</h3>
            <div style={{ fontSize: 28 }}>{(balance ?? 0) / 100} USD</div>
          </div>
        )}
      </Container>
    </div>
  )
}
