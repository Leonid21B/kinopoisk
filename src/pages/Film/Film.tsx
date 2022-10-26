import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilm } from "../../redux/reducers/CurrentFilmSlice";
import { getCurrentFilmSelector } from "../../redux/selectors/CurrentFilmSelector";
import style from './Film.module.css'
import { LeftFilm } from "./LeftFilm/LeftFilm";

export const Film = () => {
  const dispatch = useAppDispatch()
  const params = useParams() 
  const filmData = useAppSelector(getCurrentFilmSelector)
  console.log(filmData)
  useEffect(() => {
    dispatch(fetchFilm(params.filmId))
  },[])
  return(
    <div className={style.container}>
      <LeftFilm imageUrl={filmData.posterUrl}/>
    </div>
  )
}