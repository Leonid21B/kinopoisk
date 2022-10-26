import React, { useEffect,useRef } from "react";
import { FilmCard } from "@components/FilmCard";
import { Filters } from "@components/Filters";
import { Preloader } from "@components/Preloader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilms, filmsSlice} from "../../redux/reducers/FilmsSlice";
import { getAllFilmsSelector } from "../../redux/selectors/FilmsSelector";
import style from "./MainPage.module.css"
import { Sort } from "./Sort/Sort";
import { useSearchParams } from 'react-router-dom'

type GenreType = {
  genre:string,
}
export const MainPage = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const isFirstLoading = useRef(true)
  const dispatch = useAppDispatch()
  const films = useAppSelector(getAllFilmsSelector)
  const {isFetchNewFilms,isFetchFilms} = useAppSelector(state => state.films)

  useEffect(() => {
    if(isFirstLoading.current){
      searchParams.forEach((item,key) => {
        dispatch(filmsSlice.actions.setFilter({name:key,value:item}))
      }) 
      dispatch(fetchFilms())
      isFirstLoading.current = false
    }
    
    
  },[])
  return(
    <>
      <div className={style.body}>
        {isFetchFilms? 
          <Preloader/> :
          <div  className={style.cardsContainer}>
            {films?.map(film => <FilmCard id={film.kinopoiskId} countries={film.countries} key={film.kinopoiskId} imageUrl={film.posterUrl} title={film.nameRu} description={film.type} genre={film.genres.map((item:GenreType) => item.genre).join(', ')}/>)}
          </div>}
        <div className="">
          <Sort/>
          <Filters/>
        </div>
      </div>
      {isFetchNewFilms && !isFetchFilms && <Preloader/>}
    </>
    
  )
}