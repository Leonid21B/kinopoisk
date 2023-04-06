import { NavigateToMain } from '@components/NavigateToMain';
import React, { useRef } from 'react';
import { Route,Routes, useLocation} from 'react-router';
import { Navigate } from 'react-router-dom';
import { Search } from './components/Search/index';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import './index.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { Film } from './pages/Film/Film';
import { MainPage } from './pages/MainPage/MainPage';
import { fetchNewFilms } from './redux/reducers/FilmsSlice';

interface RouteType{
  path:string,
  Component:React.FC,
}
const MainComponent = () => <><Search/><MainPage/></>
const routes = [
  {path:'/kinopoisk/:filmId',Component:Film},
  {path:'/kinopoisk',Component:MainComponent},
  {path:'/*',Component:NavigateToMain},
]
function App() {
  const location = useLocation()
  const appRef = useRef<HTMLDivElement>(null)
  const enableCall = useRef<boolean>(true)
  const dispatch = useAppDispatch()
  const scrollHandler = (e:React.UIEvent<HTMLDivElement>) => {
    if(!enableCall.current){
      return
    }
    if(appRef.current !== null && appRef.current.scrollHeight - e.currentTarget.scrollTop < 1000){
      dispatch(fetchNewFilms())
    }
    enableCall.current = false
    setTimeout(() => {
      enableCall.current = true
    },200)
  }

  return (
      <div ref={appRef} onScroll={scrollHandler} className="App">
            <Routes location={location}>
              {routes.map((params) => {
                const {Component,path} = params
                return(
                  <Route path={path} key={params.path + 'route'}
                    element={<Component/>}
                  />
                )}
              )}
            </Routes>
        
      </div>
  );
}

export default App;
