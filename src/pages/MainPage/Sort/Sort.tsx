import React from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "../../../components/Select";
import { useAppDispatch } from "../../../hooks/redux";
import { useChangeDebounce } from "../../../hooks/useDebounceDispatch";
import { useToggleSearchParams } from "../../../hooks/useToggleSearchParams";
import { fetchFilms, filmsSlice } from "../../../redux/reducers/FilmsSlice";

export const Sort = () => {
  const debounce = useChangeDebounce(() => dispatch(fetchFilms()),500)
  const dispatch = useAppDispatch()
  const {setParams} = useToggleSearchParams()
  const choiceHandler = (value:string) => {
    setParams('order',value)
    dispatch(filmsSlice.actions.setFilter({name:'order',value}))
    if(debounce?.current) debounce.current('12')
  }
  return(
    <Select title="Сортировать по" action={choiceHandler} items={[{value:'RATING',visible:'Рейтинг'}, {value:'NUM_VOTE',visible:'Количество голосов'}, {value:'YEAR',visible:'Год выпуска'}]}/> 
  )
}