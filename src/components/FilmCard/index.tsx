import React from 'react'
import style from './style.module.css'

interface FilmCardProps{
  title:string,
  description: string,
  genre: string,
  imageUrl: string,
  countries: string[],
}
export const FilmCard = ({title,description,genre,imageUrl,countries}: FilmCardProps) => {
  return(
    <div className={style.body}>
      <img src={imageUrl} className={style.image} alt="" />
      <div className={style.contentBlock}>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.genre}>Жанр: {genre}</h2>
        <p className={style.description}>Страны: {countries.map((it:any) => it.country).join(', ')}</p>
      </div>
    </div>
  )
}