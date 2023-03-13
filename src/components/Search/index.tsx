import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector} from "../../hooks/redux";
import { useChangeDebounce } from "../../hooks/useDebounceDispatch";
import { debounce } from "../../functions/debouce";
import { fetchFilms, filmsSlice } from "../../redux/reducers/FilmsSlice";
import style from './style.module.css'
import { current } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import { useToggleSearchParams } from "../../hooks/useToggleSearchParams";
import { getSearchValueSelector } from "../../redux/selectors/FilmsSelector";



export const Search = () => {
  const changeDebounce = useChangeDebounce(() => {appDispatch(fetchFilms())},600)
  const valueInput = useAppSelector(getSearchValueSelector)
  const appDispatch = useAppDispatch()
  const {setParams} = useToggleSearchParams()
  const inputHandler = (e:any) => {    
    setParams('keyword',e.target.value)
    appDispatch(filmsSlice.actions.setFilter({name: 'keyword',value:e.target.value}))
    if(changeDebounce?.current) changeDebounce.current(e.target.value)
  }
  
  return(
    <div className={style.body}>
      <h1 className={style.title}>Поиск</h1>
      <input onChange={inputHandler} placeholder={'Введите название'} value={valueInput} className={style.input}type="text" />
    </div>
  )
}