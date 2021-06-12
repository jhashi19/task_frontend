import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './login/Login';
import Task from './tasks/Task';

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Login} />
      <Route exact path='/tasks' component={Task} />
    </BrowserRouter>
  )
}

export default Router;

