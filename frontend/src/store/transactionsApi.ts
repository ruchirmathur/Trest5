import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Balance', 'Transactions'],
  endpoints: (build) => ({
    getBalance: build.query<number, string>({
      query: (accountId) => `/accounts/${accountId}/balance`,
      keepUnusedDataFor: 2, // short TTL as per LLD
      providesTags: ['Balance']
    }),
    getTransactions: build.query<any, { accountId: string; limit?: number } | void>({
      query: ({ accountId, limit = 25 } = { accountId: '', limit: 25 }) => `/transactions?accountId=${accountId}&limit=${limit}`,
      providesTags: ['Transactions']
    })
  })
})

export const { useGetBalanceQuery, useGetTransactionsQuery } = transactionsApi
