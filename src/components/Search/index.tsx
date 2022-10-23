import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch} from "../../hooks/redux";
import { useChangeDebounce } from "../../hooks/useDebounceDispatch";
import { debounce } from "../../functions/debouce";
import { fetchFilms, filmsSlice } from "../../redux/reducers/FilmsSlice";
import style from './style.module.css'
import { current } from "@reduxjs/toolkit";

export const Search = () => {
  const changeDebounce = useChangeDebounce(() => {appDispatch(fetchFilms())},600)
  const [valueInput,setValue] = useState('')
  const appDispatch = useAppDispatch()
    
  const inputHandler = (e:any) => {
    setValue(e.target.value)
    appDispatch(filmsSlice.actions.setFilter({name: 'keyword',value:e.target.value}))
    if(changeDebounce?.current) changeDebounce.current(e.target.value)
  }

  return(
    <div className={style.body  }>
      <h1 className={style.title}>Поиск</h1>
      <input onChange={inputHandler} placeholder={'Введите название'} value={valueInput} className={style.input}type="text" />
    </div>
  )
}