import React from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "../../../components/Select";
import { useAppDispatch } from "../../../hooks/redux";
import { useChangeDebounce } from "../../../hooks/useDebounceDispatch";
import { fetchFilms, filmsSlice } from "../../../redux/reducers/FilmsSlice";
type ParamsType ={
  [key:string]: string,
}
export const Sort = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const debounce = useChangeDebounce(() => dispatch(fetchFilms()),500)
  const dispatch = useAppDispatch()
  const choiceHandler = (value:string) => {
    setSearchParams((prev) => {
        let newParams:ParamsType = {}
        prev.forEach((value,key) => {
          newParams[key] = value
        })
        newParams['order'] = value
        return newParams
      })
    dispatch(filmsSlice.actions.setFilter({name:'order',value}))
    if(debounce?.current) debounce.current('12')
  }
  return(
    <Select title="Сортировать по" action={choiceHandler} items={[{value:'RATING',visible:'Рейтинг'}, {value:'NUM_VOTE',visible:'Количество голосов'}, {value:'YEAR',visible:'Год выпуска'}]}/> 
  )
}