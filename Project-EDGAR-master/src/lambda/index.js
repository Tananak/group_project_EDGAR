import React from "react";
import { ReactDOM } from "react-dom";
import App from './app';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tutorial from './components/Tutorial';



ReactDOM.render(
    
    <Router>
        <Routes>
            <Route path ='/' element ={<App/>}/>
            <Route path ='/Tutorial' element = {<Tutorial/>}/>
        </Routes>
    </Router>,
    document.getElementByID('root')

);






