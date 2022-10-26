import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useChangeDebounce } from '../../hooks/useDebounceDispatch'
import { fetchFilms, filmsSlice } from '../../redux/reducers/FilmsSlice'
import { Toggle } from '@components/Toggle'
import style from './style.module.css'
import { useToggleSearchParams } from '../../hooks/useToggleSearchParams'

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
  const {setParams} = useToggleSearchParams()
  const changeDebounce = useChangeDebounce(() => dispatch(fetchFilms()),1000)
  const toggleFilter = (name:string) => {
    return function(value:string){
      dispatch(filmsSlice.actions.toggleFilter({name,value}))
      setParams(name,value)
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