import {Switch,Route, Redirect} from "react-router-dom";
import React from 'react'
import Home from "../Home";
import Showdata from "../Showdata";
import { Login } from "../Login";
import { useSelector } from "react-redux";

export const Dieuhuongurl = () => {
  const login = useSelector(state=>state.login)
  return (
    <Switch>
            <Route exact path="/">
              {login.length>0 ? <Redirect to="/home" /> : <Login />}
            </Route>
            
            <Route exact path="/home">
              {login.length===0 ? <Redirect to="/" /> : <Home />}
            </Route>
            <Route path="/home/:id">
              {login.length===0 ? <Redirect to="/" /> : <Showdata />}
            </Route>
            {/* <Route exact path="/home">
              <Home/>
            </Route>
            <Route path="/home/:id">
              <Showdata/>
            </Route> */}
           
          </Switch>
  )
}

