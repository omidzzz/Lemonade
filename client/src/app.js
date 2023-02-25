import React, {Component} from 'react'
import {BrowserRouter, Routes, Route, Link, NavLink, Navigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home'

const App = () => {

    return (
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )
}

export default App;