import React from 'react'
import { FiltersBlock } from '../FiltersBlock'
import style from './style.module.css'

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
  return(
    <div className={style.container}>
      <FiltersBlock name='genres' title='Жанр' items={itemsGenres}/>
      <FiltersBlock name='countries' title='Страна' items={itemsCountries}/>
    </div>
  )
}