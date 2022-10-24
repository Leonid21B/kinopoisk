import React, { useRef } from 'react';
import { Route} from 'react-router';
import { Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Filters } from './components/Filters';
import { Preloader } from './components/Preloader';
import { Search } from './components/Search/index';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import './index.css';
import { MainPage } from './pages/MainPage/MainPage';
import { fetchNewFilms } from './redux/reducers/FilmsSlice';

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const enableCall = useRef<boolean>(true)
  const dispatch = useAppDispatch()
  const scrollHandler = (e: any) => {
    if(!enableCall.current){
      return
    }
    if(appRef.current !== null && appRef.current.scrollHeight - e.target.scrollTop < 1000){
      dispatch(fetchNewFilms())
    }
    enableCall.current = false
    setTimeout(() => {
      enableCall.current = true
    },200)
  }

  return (
    
      <div ref={appRef} onScroll={scrollHandler} className="App">
        <Routes>
          <Route  path='/' element={(
            <>
              <Search/>
              <MainPage/>
            </>
          )} />
          <Route path='*' element={(<Navigate replace to={'../'}/>)}/>
        </Routes>
      </div>
  );
}

export default App;
