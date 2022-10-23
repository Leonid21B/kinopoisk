import { useEffect, useRef } from "react"
import { debounce } from "../functions/debouce"
import { useAppDispatch } from "./redux"


export const useChangeDebounce = (callBack:() => void,ms:number) => {
  const dispatch = useAppDispatch()
  const changeDebounce = useRef<(value:string) => void>()
  useEffect(() => {
    changeDebounce.current = debounce(callBack, ms)
  },[])
  return changeDebounce
}