import axios from "axios";
import { FiltersType } from "../models/FilmsModels";

const base = axios.create({
  baseURL:'https://kinopoiskapiunofficial.tech/api/v2.2/films',
  withCredentials:false,
  headers:{
    "x-api-key": "e2a9a022-93ff-471d-93e5-f41a6af47c07",
  }
})

export const API = {
  getFilms(filters:FiltersType & {page:string[]}){
    let resFilters = []
    for(let it in filters){
      if(it in filters && filters[it]?.length){
        resFilters.push([it,filters[it].join(',')])
      }
    }
    const params = new URLSearchParams(resFilters)
    return base.get('',{
      params
    })
  },
  getCurrentFilm(id:string){
    return base.get(`/${id}`)
  }

}