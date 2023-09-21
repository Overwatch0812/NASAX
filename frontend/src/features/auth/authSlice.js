import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";



const initialState={
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
// for signup
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
            .addCase(signup.rejected,(state)=>{
                state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
    }
}
)
// for signup ends


// for loading
const load=async()=>{
    if(localStorage.getItem("access")){
        const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization":`JWT ${localStorage.getItem('access')}`,
              "Accept": "application/json",
            }
          };
        const data=await axios.get('http://127.0.0.1:8000/auth/users/me/',config)
        return data
    }else{
        console.log('Error in loadiing User')
    }
}


// for login
export const login=createAsyncThunk(
    'auth/signup',
    async(userData,thunkAPI)=>{
        try {
            const data=await authService.login(userData)
            if(!data.access){
                console.log('No ACCESS')
            }else{
                localStorage.setItem('access',data.access)
                console.log(load())
            }
            return data
        } catch (error) {
            const message=(error.response&&error.response.data.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
    
    );
    
    export const loginSlice=createSlice({
        name:"login",
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
            .addCase(signup.rejected,(state)=>{
                state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
    }
}
)
// for login ends

export default authSlice.reducer
