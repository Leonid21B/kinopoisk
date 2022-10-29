import React, { useEffect ,useRef, useState} from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilm } from "../../redux/reducers/CurrentFilmSlice";
import { getCurrentFilmSelector } from "../../redux/selectors/CurrentFilmSelector";
import style from './Film.module.css'
import { LeftFilm } from "./LeftFilm/LeftFilm";
import { RightFilms } from "./RightFilm/RightFilms";
import closeIcon from '@img/close.svg'
import { CSSTransition } from "react-transition-group";


export const Film = () => {
  const dispatch = useAppDispatch()
  const params = useParams() 
  const [isTrans,setTrans] = useState(false) 
  const filmData = useAppSelector(getCurrentFilmSelector)
  const navigate =  useNavigate()
  console.log(filmData)
  const closePage = () => {
    setTrans(false)
    setTimeout(() => {
      navigate(-1)
    },500)

  }
  useEffect(() => {
    setTrans(true)
    dispatch(fetchFilm(params.filmId))
  },[])
  return(
    <CSSTransition mountOnEnter timeout={10000} in={isTrans} classNames={'pages'}> 
      <div className={style.container}>
        <LeftFilm imageUrl={filmData.posterUrl}/>
        <RightFilms type={filmData.type} age={filmData.ratingAgeLimits?.split('age').join('')} year={filmData.year} slogan={filmData.slogan} genres={filmData.genres} description={filmData.description} title={filmData.nameRu} rating={filmData.ratingKinopoisk}/>
        <img onClick={closePage} src={closeIcon} alt="" />
      </div>
    </CSSTransition>
  )
}