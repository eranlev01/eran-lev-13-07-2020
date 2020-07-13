import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
         <Route path="/login" component={Login}></Route>
         <Route path="/register" component={Register}></Route>
         <Route  path="/admin-dashboard" component={AdminDashboard}></Route>
         <Route  path="/user-dashboard" component={UserDashboard}></Route>
         <Redirect exact from="/" to="/login"></Redirect>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
