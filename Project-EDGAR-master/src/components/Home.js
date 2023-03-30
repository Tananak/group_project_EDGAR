import React, { Component } from "react";

import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"

//import EricsTestComponent from "./components/EricsTestComponent";
import GraphFireballsByMonth from "./GraphFireballsByMonth";
import AverageFireballs from "./AverageFireballs";
//import Landing from "./components/Landing";

import Header from "./Header";
import Form from "./Form";
import Footer from "./Footer";
//imports for Navigation
//import About from "./components/About";
//import Tutorial from "./components/Tutorial";


class Home extends Component {

  
  render() {    
    return (
      <div className="landing">
        <header>
          <Header/>
        </header>
        <body>
          <div className="intro">
            <div className="container my-3">
              <div className="row justify-content-left">
                <div className="col-lg-9">
                    <h2>Welcome, to Project EDGAR</h2>
                        {/* 
                        <p className="lead">
                          Visualizing Fireball Data from 1988 to 2022
                        </p> 
                        */}
                        <p className="mb-3">
                          Providing insight into Fireball and Orbital Decay data through the use of dynamic graphs. 
                          EDGAR uses the Fireballs API from NASA Jet Propulsion Laboratory's (JPL) Center for Near-Earth Object Studies (CNEOS), 
                          as well as other data sources, to focus on extraterrestrial debris over time. It is by combining the Fireballs data with these
                          other data sets that we are able to test theories and better understand how these different datasets are connected.
                        </p>
                </div>
              </div>
            </div>
          </div>
        </body>
          <Form/>
          <GraphFireballsByMonth/>
          <AverageFireballs/>
          <Footer/>
      </div>
    )
  }
}

export default Home
