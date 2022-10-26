import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
type ParamsType ={
  [key:string]: string,
}
export function useToggleSearchParams(){
  const [searchParams,setSearchParams] = useSearchParams()
  function resFunc(name:string,value:string){
    setSearchParams((prev) => {
          let newParams:ParamsType = {}
          prev.forEach((val,key) => {
            newParams[key] = val
          })
          if(!value || newParams[name] === value){
            delete newParams[name]
            return newParams
          }
          newParams[name] = value
          return newParams
      })
  }
  return {
    params:searchParams,
    setParams:resFunc
  }
}