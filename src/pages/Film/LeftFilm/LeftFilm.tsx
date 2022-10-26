import React from "react";
import style from './LeftFilm.module.css'

interface LeftFilmProps{
  imageUrl:string;
}
export const LeftFilm = ({imageUrl}:LeftFilmProps) => {
  return(
    <>
      <div className={style.poster}>
        <img src={imageUrl} className={style.image} alt="" />
      </div>
      
    </>
  )
}