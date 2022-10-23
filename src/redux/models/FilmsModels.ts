export type FilterModel = {
  name: string,
  value: string
}
export interface FiltersType{
  genres:Array<string> ,
  countries:Array<string>,
  keyword:Array<string>,
  order:Array<string>,
  [key:string]:Array<string>
}
export interface FlimsState{
  page:number,
  isFetchFilms:boolean,
  isFetchNewFilms:boolean,
  films:Array<any>,
  filters:FiltersType,
}