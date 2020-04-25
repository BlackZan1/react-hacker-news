import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import NewsPage from './components/NewsPage/NewsPage';
import './App.css';
import MainPageComponent from './components/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <div className="main">
      <header className="main-header">
        <h1>Hack my NEWS - <NavLink to={'/news'}><span>HACKER NEWS</span></NavLink></h1>
      </header>
      
      <Switch>
        <Route path={'/news'} exact component={MainPageComponent} />
        <Route path={'/item/:id?'} component={NewsPage} />

        <Redirect to={'/news'} exact />
      </Switch>
    </div>
  );
}

export default App;
