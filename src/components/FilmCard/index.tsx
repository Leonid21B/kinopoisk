import React from 'react'
import { useNavigate } from 'react-router'
import style from './style.module.css'

interface FilmCardProps{
  title:string,
  description: string,
  genre: string,
  imageUrl: string,
  countries: Array<{country:string}>,
  id:number,
}
export const FilmCard = ({id,title,description,genre,imageUrl,countries}: FilmCardProps) => {
  const navigate = useNavigate()
  return(
    <div className={style.body} onClick={() => navigate(`./${id}`)}>
      <img src={imageUrl} className={style.image} alt="" />
      <div className={style.contentBlock}>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.genre}>Жанр: {genre}</h2>
        <p className={style.description}>Страны: {countries.map((it) => it.country).join(', ')}</p>
      </div>
    </div>
  )
}