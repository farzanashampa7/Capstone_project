import React from 'react';
import Header from './components/Header/Header';
import './App.scss';
import Main from './components/Main/Main';
import Input from './components/Input/Input';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Main /> */}
        <Switch>
          <Route path='/' exact component={Header} />
          <Route path='/input' component={Input} />


        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
