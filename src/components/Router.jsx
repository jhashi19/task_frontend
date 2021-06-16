import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './login/Login';
import Task from './tasks/Task';

const Router = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Route exact path='/' component={Login} />
        <Route exact path='/tasks' component={Task} />
      </CookiesProvider>
    </BrowserRouter>
  )
}

export default Router;

