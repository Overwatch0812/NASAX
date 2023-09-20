import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";



const initialState={
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const signup=createAsyncThunk(
    'auth/signup',
    async(userData,thunkAPI)=>{
        try {
            return await authService.signup(userData)
        } catch (error) {
            const message=(error.response&&error.response.data.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }

);




export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signup.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(signup.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(signup.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
    }
}
)

export default authSlice.reducer
