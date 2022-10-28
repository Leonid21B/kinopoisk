export interface CurrentFilmType{
  nameRu:string,
  posterUrl:string,
  ratingKinopoisk:number,
  year:number,
  slogan:string,
  description:string,
  shortDescription:string,
  countries:Array<{country:string}>,
  genres:Array<{genre:string}>,
  ratingAgeLimits:string,
  type:string,
}