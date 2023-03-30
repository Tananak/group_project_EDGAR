
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"


import Header from "./Header";
import Footer from "./Footer";

import tut1 from "../../src/tutorialPictures/tut1.png";
import tut2 from "../../src/tutorialPictures/tut2.png";
import tut3 from "../../src/tutorialPictures/tut3.png";
import tut4 from "../../src/tutorialPictures/tut4.png";
import tutg1 from "../../src/tutorialPictures/tutg1.gif";
import tutg2 from "../../src/tutorialPictures/tutg2.gif";
import tutg3 from "../../src/tutorialPictures/tutg3.gif";


const Tutorial = () => {
  return (
    <div className="landing">
      <header>
          <Header/>
      </header>
      <body>
        <div className="intro">
          <div className="container my-3">
            <div className="row justify-content-left">
              <div>
                <h2>Project EDGAR Tutorial</h2>
                <p className="lead">A Step by Step Guide</p>
                  <ol className="mb-0">
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    Choose a timeframe of data to display by selecting a start and end date from the calendar.
                    </li>
                      <img className="tutorialImg" src={tut1} alt=""/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    Determine which chart type you would like to use in order to visualize your preferred data.
                    </li>
                      <img className="tutorialImg" src={tut2} alt=""/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    Toggle the visibility of graph elements by clicking the text in the legend beside the graph. The text for deselected elements will become faded.
                    </li>
                      <img className="tutorialImg" src={tut3} alt=""/>
                      <img className="tutorialImg" src={tutg1}  alt="" style={{marginTop: '2rem'}}/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    To graph one specific type of data without manually deselecting everything, double-click on the desired data in the legend.
                    </li>
                      <img className="tutorialImg" src={tutg2} alt=""/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    If you trace your mouse along the left or lower border of the graph, you will notice it becomes an arrow. A double-sided arrow indicates the panning 
                    function will activate upon left-clicking and dragging the mouse. A one-sided arrow indicates the stretch function will activate upon left-clicking and dragging the mouse.
                    </li>
                      <img className="tutorialImg" src={tutg3} alt=""/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    To discover additional functionalities, use the mouse to hover over the top right portion of the chart. From here you can save charts as PNG files, zoom
                    in and out, toggle hovering displays, and more. 
                    </li>
                    <img className="tutorialImg" src={tut4} alt=""/>
                    <li className="tutorialListFormat" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    Make observations, observe correlations, hypothesize causations, and re-use the software using different input parameters as many times as desired!
                    </li>
                  </ol>
              </div>
            </div>
          </div>
        </div>
      </body>
        <Footer/>
    </div>
  )
}

export default Tutorial