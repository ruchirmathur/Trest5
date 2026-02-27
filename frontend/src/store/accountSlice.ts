import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState {
  selectedAccountId: string | null
  balance: number | null
}

const initialState: AccountState = {
  selectedAccountId: null,
  balance: null
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    selectAccount(state, action: PayloadAction<string>) {
      state.selectedAccountId = action.payload
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    }
  }
})

export const { selectAccount, setBalance } = slice.actions
export default slice.reducer
