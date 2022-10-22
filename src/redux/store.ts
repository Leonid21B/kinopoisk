import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import FilmsSlice from "./reducers/FilmsSlice";

const rootReducer = combineReducers(
  {
    films: FilmsSlice,
  }
)
const setupStore = () => {
  return configureStore({
    reducer:rootReducer
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export default setupStore