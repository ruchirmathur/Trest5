import React, { useState } from 'react'
import { useGetTransactionsQuery } from '../store/transactionsApi'
import NavBar from '../components/NavBar'
import styled from 'styled-components'

const Container = styled.div`padding:20px;`

export default function TransactionHistory() {
  const [accountId] = useState('acc_123')
  const { data, error, isLoading } = useGetTransactionsQuery({ accountId, limit: 25 })

  return (
    <div>
      <NavBar />
      <Container>
        <h2>Transactions for {accountId}</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading transactions</div>
        ) : (
          <div>
            {(data?.items || []).length === 0 ? (
              <div>No transactions</div>
            ) : (
              <table>
                <thead>
                  <tr><th>ID</th><th>Amount</th><th>Type</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {(data.items || []).map((t: any) => (
                    <tr key={t.transactionId}>
                      <td>{t.transactionId}</td>
                      <td>{(t.amount || 0) / 100}</td>
                      <td>{t.type}</td>
                      <td>{t.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}
