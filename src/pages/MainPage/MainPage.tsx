import React, { useEffect } from "react";
import { FilmCard } from "../../components/FilmCard/index";
import { Filters } from "../../components/Filters";
import { Preloader } from "../../components/Preloader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilms} from "../../redux/reducers/FilmsSlice";
import { getAllFilmsSelector } from "../../redux/selectors/FilmsSelector";
import style from "./MainPage.module.css"

type GenreType = {
  genre:string,
}
export const MainPage = () => {
  
  const dispatch = useAppDispatch()
  const films = useAppSelector(getAllFilmsSelector)
  const {isFetchNewFilms,isFetchFilms} = useAppSelector(state => state.films)
  console.log(films)
  useEffect(() => {
    dispatch(fetchFilms())
  },[])
  return(
    <>
      <div className={style.body}>
        {isFetchFilms? 
          <Preloader/> :
          <div  className={style.cardsContainer}>
            {films?.map(film => <FilmCard countries={film.countries} key={film.kinopoiskId} imageUrl={film.posterUrl} title={film.nameRu} description={film.type} genre={film.genres.map((item:GenreType) => item.genre).join(', ')}/>)}
          </div>}
        <Filters/>
      </div>
      {isFetchNewFilms && !isFetchFilms && <Preloader/>}
    </>
    
  )
}