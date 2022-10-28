import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../api/api";

const initialState = {
  film:{
    nameRu:'',
    posterUrl:'',
    ratingKinopoisk:10,
    year:2022,
    slogan:'',
    description:'',
    shortDescription:'',
    countries:[],
    genres:[],
    ratingAgeLimits:'age18',
    type:'',
  },
  isLoading:false,
}

export const fetchFilm = createAsyncThunk('currentFilm/fetchFilm',async (id:string|undefined,thunkApi) => {
  if(!id) return thunkApi.rejectWithValue({message:'id is undefinded',code:1})
  thunkApi.dispatch(currentFilmSlice.actions.setLoading(true))
  const resp = await API.getCurrentFilm(id).then(res => res.data)
  console.log(resp)
  return resp
})

export const currentFilmSlice = createSlice({
  name: 'currentFilm',
  initialState,
  reducers:{
    setLoading(state,action:PayloadAction<boolean>){
      state.isLoading = action.payload
    }
  },
  extraReducers:{
    [fetchFilm.fulfilled.toString()]:(state,action)=> {
      state.film = action.payload
      state.isLoading = false
    },
    [fetchFilm.rejected.toString()]:(state,action)=> {
      console.log(action.message)
      state.isLoading = false
    },
  }
  
})

export default currentFilmSlice.reducer