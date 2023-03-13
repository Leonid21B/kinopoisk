import React, { useState } from 'react'
import { FiltersBlock } from '@components/FiltersBlock'
import style from './style.module.css'
import closeIcon from '../../images/close.svg'

const itemsGenres = [
  {value:'1',visible:'Триллер'}, 
  {value:'2',visible:'Драма'}, 
  {value:'3',visible:'Криминал'},
  {value:'4',visible:'Мелодрама'},
  {value:'5',visible:'Детектив'},
  {value:'6',visible:'Фантастика'},
  {value:'7',visible:'Приключения'},
]
const itemsCountries= [
  {value:'1',visible:'США'}, 
  {value:'2',visible:'Швейцария'}, 
  {value:'3',visible:'Франция'},
  {value:'8',visible:'Испания'},
  {value:'16',visible:'Япония'}, 
  {value:'5',visible:'Великобритания'},
  {value:'6',visible:'Швеция'},
]

export const Filters = () => {
  const [activeFilters,setActiveFilters] = useState<boolean>(false)
  return(
    <>
      <div className={`${style.container} ${activeFilters ? style.activeFilter : ''}`}>
        <FiltersBlock name='genres' title='Жанр' items={itemsGenres}/>
        <FiltersBlock name='countries' title='Страна' items={itemsCountries}/>
        <img onClick={() => setActiveFilters(false)} className={style.closedBtn} src={closeIcon} alt="" />
      </div>
      <button className={style.activateBtn} onClick={() => setActiveFilters(true)}>Фильтры</button>
    </>
  )
}