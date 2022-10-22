import React from "react";
import loadingPicture from '../../images/preloader.svg'
import style from './style.module.css'
export const Preloader = () => {
  return(
    <div className={style.container}>
      <img src={loadingPicture} alt="" />
    </div>
  )
}