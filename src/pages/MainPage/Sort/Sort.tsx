import React from "react";
import { Select } from "../../../components/Select";

export const Sort = () => {
  return(
    <Select title="Сортировать по" action={() => {}} items={[{value:'RATING',visible:'Рейтинг'}, {value:'NUM_VOTE',visible:'Количество голосов'}, {value:'YEAR',visible:'Год выпуска'}]}/> 
  )
}