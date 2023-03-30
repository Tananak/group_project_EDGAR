import React from 'react'

import Header from "./Header";
import Footer from "./Footer";

import logo from "../../src/edgarlogo.PNG";
import eric from "../../src/aboutPictures/eric.png";
import zack from "../../src/aboutPictures/zack.png";
import stephanie from "../../src/aboutPictures/stephanie.png";
import rachel from "../../src/aboutPictures/rachel.jpg";
import tana from "../../src/aboutPictures/tana.png";

const About = () => {
    return (
        <div>
        <header>
            <Header/>
        </header>
        <body>
        <div className="landing">
            <div className="intro">
            <img className="eLogo" src={logo} alt=""/>
                <div className="container my-5">
                    <div className="row justify-content-left">
                        <div className="col-lg-8">
                            <h2>Project EDGAR</h2>
                            <p className="lead">What is Project EDGAR?</p>
                            <p className="mb-0">
                            Project EDGAR is an event-driven system that allows users to explore multiple datasets dynamically. 
                            The system reacts to the users form selections in order to generate graphs based on the given parameters. 
                            Additionally, the Plotly library is utilized to enable toggling on/off graph elements, zooming, and scrolling functionality.
                            </p>
                            <br></br>
                            <p className="lead">Software Development Senior Capstone</p>
                            <p className="mb-0">
                                Project EDGAR was designed and developed by five Seniors attenting the College of Computing and Informatics (CCI) at The University of North Carolina at Charlotte.
                                The project was completed as part of the Software Development Projects (ITSC 4155) capstone class in the Fall of 2022.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row justify-content-right"></div>
                        <div className="col-lg-11">
                                <h2>About the Team</h2>

                                <h3 style={{marginTop: '2rem'}}>Eric Baca</h3>
                                <p className="txtfloat">Bachelor of Science in Computer Science with a Concentration in Software Engineering</p>
                                <img src={eric} width="275px" height="250px" alt=""/>

                                <h3 style={{marginTop: '2rem'}}>Zack Champion</h3>
                                <p className="txtfloat">Bachelor of Science in Computer Science with a Concentration in AI, Robotics, and Gaming</p>
                                <img src={zack} width="275px" height="250px" alt=""/>

                                <h3 style={{marginTop: '2rem'}}>Suntana Nak</h3>
                                <p className="txtfloat">Bachelor of Science in Computer Science with a Concentration in Software Engineering</p>
                                <img src={tana} width="275px" height="250px" alt=""/>

                                <h3 style={{marginTop: '2rem'}}>Stephanie Navarro</h3>
                                <p className="txtfloat">Bachelor of Science in Computer Science with a Concentration in Systems, Software, and Networks</p>
                                <img src={stephanie} width="275px" height="250px" alt=""/>

                                <h3 style={{marginTop: '2rem'}}>Rachel Taylor</h3>
                                <p className="txtfloat">Bachelor of Arts in Computer Science with a Concentration in Information Technology</p>
                                <img src={rachel} width="275px" height="250px" alt=""/>

                                <h2 style={{marginTop: '2rem'}}>Sources</h2>
                                <h3 style={{marginTop: '2rem'}}>JPL CNEOS</h3>
                                <p><a href="https://cneos.jpl.nasa.gov/fireballs/">Fireballs Data API</a></p>
                                <h3 style={{marginTop: '2rem'}}>SAIC</h3>
                                <p><a href="https://www.space-track.org">Spacecraft Orbital Decay Data</a></p>
                                <h3 style={{marginTop: '2rem'}}>Sky and Telescope</h3>
                                <p><a href="https://skyandtelescope.org">Meteor Shower Data</a></p>
                                <h3 style={{marginTop: '2rem'}}>Space Weather Live</h3>
                                <p><a href="https://www.spaceweatherlive.com/">Solar Flare Data</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        <footer>
            <Footer/>
        </footer>
        </div>
    )
}
export default About