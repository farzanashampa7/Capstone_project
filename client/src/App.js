import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Input from './components/Input/Input';
import './App.scss';

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <Main /> */}
        <Switch>
          <Route path='/' exact component={Hero} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/input' component={Input} />


        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
