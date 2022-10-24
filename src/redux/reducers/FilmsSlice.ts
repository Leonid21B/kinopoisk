import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { FilterModel, FlimsState } from "../models/FilmsModels";
import { API } from '../api/api';

const initialState:FlimsState = {
  films:[],
  page:1,
  filters:{
    genres:[],
    countries:[],
    keyword:[],
    order:['RATING'],
  },
  isFetchFilms:false,
  isFetchNewFilms:false,
}

const racePromise = (ms:number) => {
 return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({data:{items:[]}})
    },ms)
 })
}
export const fetchFilms = createAsyncThunk(
  'films/getFilms',
  async(_,thunkApi) => {
    const state = thunkApi.getState() as any
    thunkApi.dispatch(filmsSlice.actions.incrementPage(true))  
    thunkApi.dispatch(filmsSlice.actions.startLoading(true))
    const resp = await API.getFilms({...state.films.filters,page:['1']}).then(res => res.data)
    return resp?.items ? resp.items : []
  }
)

export const fetchNewFilms = createAsyncThunk(
  'films/getNewFilms',
  async(_,thunkApi) => {
    const state = thunkApi.getState() as any
    if(state.films.isFetchNewFilms){
      return thunkApi.rejectWithValue(12)
      
    }
    thunkApi.dispatch(filmsSlice.actions.startNewLoading(true))
    const resp = API.getFilms({...state.films.filters,page:[(1 +state.films.page).toString()]})
    const items = await Promise.race([resp,racePromise(10000)]).then((res:any) => res.data.items)
    if(items.length !== 0 ) thunkApi.dispatch(filmsSlice.actions.incrementPage())
    return items
  }
)

/*export const setFilter = createAsyncThunk(
  'films/setFilter',
  async(filter:FilterModel,thunkApi) => {
    const state = thunkApi.getState() as any
    thunkApi.dispatch(filmsSlice.actions.startNewLoading(true))
    const resp = API.getFilms([{name: 'page',value: 1},...state.films.filters])
    thunkApi.dispatch(filmsSlice.actions.incrementPage(true))
    const items = await Promise.race([resp,racePromise(10000)]).then((res:any) => res.data.items)
    if(items.length !== 0 ) thunkApi.dispatch(filmsSlice.actions.incrementPage())
    return items
  }
)*/
export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialState,
  reducers:{
    incrementPage(state,action:PayloadAction<boolean|undefined>){
      if(action.payload === undefined){
        state.page += 1
        return
      }
      state.page = 1
    },
    startLoading(state,action:PayloadAction<boolean>){
      state.isFetchFilms = action.payload
    },
    startNewLoading(state,action:PayloadAction<boolean>){
      state.isFetchNewFilms = action.payload
    },
    toggleFilter(state,action:PayloadAction<FilterModel>){
      if(action.payload.name === 'genres' || action.payload.name === 'countries'){
        const index = state.filters[action.payload.name].findIndex(it => action.payload.value === it) 
        state.filters[action.payload.name] = []
        if(index === -1){
          state.filters[action.payload.name].push(action.payload.value)
        }
        return
      }
      
    },
    setFilter(state,action:PayloadAction<FilterModel>){
      state.filters[action.payload.name] = [action.payload.value]
    }

  },
  extraReducers:{
    [fetchFilms.fulfilled.toString()]:(state,action) => {
      state.films = action.payload
      state.isFetchFilms = false
    },
    [fetchNewFilms.fulfilled.toString()]:(state,action) => {
      state.films = [...state.films,...action.payload]
      state.isFetchNewFilms = false
    },
    [fetchNewFilms.rejected.toString()]:(state,action) => {
      console.log('reject')
    },
  }
  
})


export default filmsSlice.reducer