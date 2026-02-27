import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'

interface AuthState {
  user: any | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any | null>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
      state.token = null
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    }
  }
})

export const { setUser, clearUser, setToken } = slice.actions
export default slice.reducer

// Helpers
export async function fetchCurrentUser(dispatch: any) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    dispatch(setUser(user))
    const session = await Auth.currentSession()
    dispatch(setToken(session.getAccessToken().getJwtToken()))
    return user
  } catch (err) {
    dispatch(clearUser())
    return null
  }
}
