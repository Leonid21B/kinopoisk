import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useChangeDebounce } from "../../hooks/useDebounceDispatch";
import { fetchFilms, filmsSlice } from "../../redux/reducers/FilmsSlice";
import { getSortSelector } from "../../redux/selectors/FilmsSelector";
import style from './style.module.css'

type ItemsType ={
  value:string,
  visible:string
}

interface SelectProps{
  title:string,
  items:Array<ItemsType>,
  action:(value:string) => void
}

export const Select = ({title,items,action}:SelectProps) => {
  const [active,setActive]  = useState(false)
  const choiceHandler = (value:string) => {
    setActive(false)
    action(value)
  }
  const activeItem = useAppSelector(getSortSelector(items))
  
  return(
    <div className={style.container}>
      <h1 className={style.title}>{title}:</h1>
      <div onClick={() => setActive(it => !it)} className={style.activator}>{activeItem}</div>
      {active && <div className={style.select}>
        {items.map(item => <p onClick={() => choiceHandler(item.value)} className={style.item}>{item.visible}</p>)}
      </div>}
    </div>
  )
}