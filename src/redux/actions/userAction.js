import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: { 'Content-Type': 'application/json',},}
                // make request to backend
                await axios.post('/register', { email, password }, config )
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
            } else {
            return rejectWithValue(error.message)
            }
        }
    
    })
    
// In the code block above, we've taken the values from the register form and made a POST request to the register route using Axios. In the event of an error, thunkAPI.rejectWithValue sends the custom error message from the backend as a payload to the reducer. You may notice that the register API is called without referencing the server's base URL. This is possible with the proxy configuration existing in frontend/package.json.

export const userLogin = createAsyncThunk(
    '/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        console.log("userAction userLogin called:");
        console.log(email, password);
        // configure header's Content-Type as JSON
        const config = {
          headers: { 'Content-Type': 'application/json', },
        }
        const { data } = await axios.post(
          '/login',
          { email, password },
          config
        )
        // store user's token in local storage
        // SHOULD BE CORRESPOND WITH GOLANG RESPONSE DATA
        localStorage.setItem('userToken', data.token)
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


// export const getUserDetails = createAsyncThunk(
//     'user/getUserDetails',
//     async (arg, { getState, rejectWithValue }) => {
//       try {
//         // get user data from store
//         const { user } = getState()
  
//         // configure authorization header with user's token
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.userToken}`,
//           },
//         }
//         const { data } = await axios.get(`/api/user/profile`, config)
//         return data
//       } catch (error) {
//         if (error.response && error.response.data.message) {
//           return rejectWithValue(error.response.data.message)
//         } else {
//           return rejectWithValue(error.message)
//         }
//       }
//     }
//   )