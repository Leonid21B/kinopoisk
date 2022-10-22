import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch} from "../../hooks/redux";
import { debounce } from "../../hooks/useDebounceDispatch";
import { fetchFilms, filmsSlice } from "../../redux/reducers/FilmsSlice";
import style from './style.module.css'

export const Search = () => {
  const changeDebounce = useRef<any>(null)
  const [valueInput,setValue] = useState('')
  const appDispatch = useAppDispatch()
    
  const inputHandler = (e:any) => {
    setValue(e.target.value)
    appDispatch(filmsSlice.actions.setFilter({name: 'keyword',value:e.target.value}))
    changeDebounce.current(e.target.value)
  }
  useEffect(() => {
    changeDebounce.current = debounce(() => {appDispatch(fetchFilms())},600)
  },[])
  return(
    <div className={style.body  }>
      <h1 className={style.title}>Поиск</h1>
      <input onChange={inputHandler} placeholder={'Введите название'} value={valueInput} className={style.input}type="text" />
    </div>
  )
}