import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Bar = styled.div`
  background: ${(p) => p.theme.colors.primary};
  color: white;
  padding: 12px 18px;
  display:flex;
  gap: 12px;
`;

export default function NavBar() {
  return (
    <Bar>
      <Link to="/account/acc_123" style={{ color: 'white', textDecoration: 'none' }}>Account</Link>
      <Link to="/transactions" style={{ color: 'white', textDecoration: 'none' }}>Transactions</Link>
      <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
    </Bar>
  )
}
