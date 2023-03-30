import React, { Component } from 'react'
import Plot from 'react-plotly.js';

class AverageFireballs extends Component {
    
    

    render() {
        // Data is hard coded, but is actual data pulled from the graph component for this time range
        let countFireballsByMonthNoShower = [3,5,5,5,2,3,2,5,3,3,1,5,0,3,5,2,3,4,6,3,4,0];
        let countFireballsByMonthDuringShower = [1,4,2,3,4,2,3,3,4,4,1,3,2,7,2,3,5,1,6,1,3,0,2,3,2,3,2,3,3,1,3,4,4,3,3,7,5,5,4,1,5,4,3,4,2,0,4,2,7];
        
        let dataToPlot = [
            {name: "No Meteor Shower", type: 'bar', x: ["Months which did not have a meteor shower"], y: [countFireballsByMonthNoShower.reduce((a, b) => a + b, 0) / countFireballsByMonthNoShower.length]},
            {name: "Meteor Shower", type: 'bar', x: ["Months which had meteor showers"], y: [countFireballsByMonthDuringShower.reduce((a, b) => a + b, 0) / countFireballsByMonthDuringShower.length]},
        ];
        let config = {
            displaylogo: false,
        }

        return (
            <>
            <br></br>
            <div className="gform">
                <h2>Average number of fireballs per month</h2>
                <p>
                    Meteor showers usually occur annually due to the earth passing through a trail of debris which is left by a comet or asteroid. 
                    Because the Earth orbits the sun at the same speed every year, scientists are capable of anticipating when meteor showers will happen.
                    In theory, we should see an increase (on average) of fireballs during months in which a meteor shower occurs. 
                    The following graph will test this theory by displaying the average number of fireballs per month for months which did or did not have meteor showers.
                </p>
                <div className="g-div">
                <Plot
                    data={ dataToPlot }
                    layout={
                        {
                            width: 800, 
                            height: 550, 
                            title: 'Average # of fireballs per month from January 2015 to December 2020',
                            yaxis: {title: {text: "Average # of fireballs per month"}},
                        }
                    }
                    config={config}
                />
                </div>
                <p>
                    Interestingly enough, between January 2015 and December 2020, there seems to be nothing to indicate that meteor showers increase the number of fireballs on average.
                    The only explanation is that the shooting stars these meteor showers produce in our night sky are simply too dim to be detected by the sensors which record the fireball data.
                </p>
            </div>
            </>
        );
    }
}

export default AverageFireballs;