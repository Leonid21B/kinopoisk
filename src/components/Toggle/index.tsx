import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { isFilterActiveSelector } from '../../redux/selectors/FilmsSelector'
import style from './style.module.css'

interface PropsToggle{
  action:(value:any) => void,
  name:string,
  value:string,
  children:React.ReactNode,
}

export const Toggle = ({action,value,name,children}:PropsToggle) => {
  const active = useAppSelector(isFilterActiveSelector(name,value))
  const clickHandler = () => {

    action(value)
  }
  return(
    <div onClick={clickHandler} className={style.container}>
      <div className={`${style.indicator} ${active ? style.active : ''}`}></div>
      {children}
    </div>
  )
}