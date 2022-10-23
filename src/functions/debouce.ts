export const debounce = (fn:() => void,ms:number) => {
  let timeout = setTimeout(() => {},0)
  return function(val:string){
    const fnCall = () => {
      fn()}
    clearTimeout(timeout)
    timeout = setTimeout(fnCall,ms)
  }
}