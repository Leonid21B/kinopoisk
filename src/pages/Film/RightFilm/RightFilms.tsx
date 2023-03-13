import React from "react";
import style from './RightFilms.module.css'


interface RightFilmsProps{
  title:string,
  rating:number,
  description:string,
  genres:Array<{genre:string}>,
  slogan:string,
  year:number,
  age:string,
  type:string,
}

export const RightFilms = ({type,age,year,title,rating,description,genres,slogan}:RightFilmsProps) => {
  return(
    <div className={style.container}>
      <h1 className={style.title}>{title}
        <p className={style.rating}>
          <p className={style.ratingText}>
            {rating} из 10 
          </p>
          <p className={style.progress}>
            <p style={{width:`${rating*10}%`}}/>
          </p>
        </p>
      </h1>
      <h2 className={style.slogan}>{slogan}</h2>
      <h3 className={style.genres}>Жанр: {genres.map(item => item.genre).join(', ')}</h3>
      <h3 className={style.year}>Год: {year}</h3>
      <div className={style.centerBlock}>
        <div className={style.type}>{type}</div>
        <div className={style.age}>{age || 0}+</div>
      </div>

      <div className={style.description}>
        <h3>Описание:</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}