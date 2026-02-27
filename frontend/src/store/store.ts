import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import accountReducer from './accountSlice'
import { transactionsApi } from './transactionsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
