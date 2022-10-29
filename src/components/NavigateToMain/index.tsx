import React from "react";
import { Navigate } from "react-router";

export const NavigateToMain = () => {
  return(
    <Navigate replace to={'../kinopoisk'}/>
  )
}