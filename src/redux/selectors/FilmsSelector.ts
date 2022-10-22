import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../store';
export const getAllFilmsSelector = (state:RootState) => state.films.films 
export const getAllFilters = (state:RootState) => state.films.filters 

export const isFilterActiveSelector = (name:string,value:string) => {
  return createSelector(getAllFilters,(filters)=> {
    if((name === 'genres' || name === 'countries' || name === 'keyword') && filters[name].find(it => it === value)){
      return true
    }
    return false
  })
}