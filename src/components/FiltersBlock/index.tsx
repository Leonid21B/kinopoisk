import React from 'react'
import {useRef,useEffect} from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useChangeDebounce } from '../../hooks/useDebounceDispatch'
import { debounce } from '../../functions/debouce'
import { fetchFilms, filmsSlice } from '../../redux/reducers/FilmsSlice'
import { Toggle } from '../Toggle'
import style from './style.module.css'

type ItemsType = {
  value:string,
  visible:string,
}

interface FiltersBlockProps{
  title: string,
  name: string,
  items:Array<ItemsType>
}

export const FiltersBlock = ({title,name,items}: FiltersBlockProps) => {
  const dispatch = useAppDispatch()
  const changeDebounce = useChangeDebounce(() => dispatch(fetchFilms()),1000)
  const toggleFilter = (name:string) => {
    return function(value:string){
      dispatch(filmsSlice.actions.toggleFilter({name,value}))
      if(changeDebounce.current !== undefined) changeDebounce.current(value)
    }
  }
  
  return(
    <div className={style.container}>
      <h1>{title}</h1>
      {items.map(item => <Toggle key={'filt' + item.value} name={name} value={item.value} action={toggleFilter(name)} children={<p className={style.toggleText}>{item.visible}</p>}/>)}
    </div>
  )
}