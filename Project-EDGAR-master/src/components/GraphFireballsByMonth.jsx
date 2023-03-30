import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import decayData from '../decayData.json';

class GraphFireballsByMonth extends Component {
    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            DataisLoaded: false,
            fireballJson: {},
            dataToPlot: [{name: "LOADING...", type: 'bar', x: [1, 2, 3], y: [1, 2, 3]}],
            config: {
                displaylogo: false,
            }
        };
    }
    // ComponentDidMount is used to
    // execute the code 
    countFireballsByMonth(json, i) {
        var countOccurances = 0;
        json.data.forEach((result) => {
        var monthNum = parseInt(result[0].split(('-'))[1], 10);
        if (monthNum === i) {
            countOccurances++;
        }
        });
        return countOccurances;
    }

    countDecaysByMonth(json, i) {
        var countOccurances = 0;
        json.forEach((result) => {
        var monthNum = parseInt(result["DECAY_EPOCH"].split(('-'))[1], 10);
        if (monthNum === i) {
            countOccurances++;
        }
        });
        return countOccurances;
    }

    getDecayDataByObjectName(object_name) {
        let object_found = false;
        let found_element = null;
        decayData.forEach((element) => {
        if (!object_found) {
            if (element["OBJECT_NAME"] === object_name && element["MSG_TYPE"] === "Historical") {
            object_found = true;
            found_element = element;
            }
        }
        });

        return found_element;
    }

    uniqueKeyValues(arr, key) {
        return [...new Set(arr.map((obj) => {return obj[key]}))];
    }

    componentDidMount() {
        fetch("https://api.allorigins.win/raw?url=https://ssd-api.jpl.nasa.gov/fireball.api", {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((json) => {
                let dataToPlot = [];
                let x_values=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let y_values = [];

                // Iterate through months January through December
                for (let i = 1; i <= 12; i++) {
                // Get count of fireball occurances for this month
                y_values.push(this.countFireballsByMonth(json, i));
                }
                dataToPlot.push({name: "Fireballs", type: 'bar', x: x_values, y: y_values, marker: {color: ["darkslategray", "darkslategray", "darkslategray", "darkslategray", "darkslategray", "darkslategray", "darkslategray", "darkslategray", "crimson", "green", "darkslategray", "darkslategray"]} });
                const fireballJson = json;

                const uniqueDecayObjectNames = this.uniqueKeyValues(decayData, "OBJECT_NAME");
                let decayJson = [];
                y_values = [];
                for (let i = 0; i < uniqueDecayObjectNames.length; i++) {
                // Get object by name
                let element = this.getDecayDataByObjectName(uniqueDecayObjectNames[i])
                // If element is not an empty dict
                if (element != null) {
                    decayJson.push(element);
                }
                }
                // Iterate through months January through December
                for (let i = 1; i <= 12; i++) {
                // Get count of fireball occurances for this month
                y_values.push(this.countDecaysByMonth(decayJson, i));
                }
                dataToPlot.push({ name: "Man-made Spacecraft Orbital Decays", type: 'bar', x: x_values, y: y_values, marker: {color: ["crimson", "lightslategray", "lightslategray", "lightslategray", "lightslategray", "lightslategray", "lightslategray", "lightslategray", "lightslategray", "lightgreen", "lightslategray", "lightslategray"]} });

                this.setState({
                DataisLoaded: true,
                fireballJson: fireballJson,
                decayJson: decayJson,
                dataToPlot: dataToPlot
                });
        });
    }

    render() {

        const {DataisLoaded, dataToPlot, config} = this.state;

        if (!DataisLoaded) return (
            <>
            <br></br>
            <div className="gform">
                <h2>Total numer of fireballs and orbital debris by month</h2>
                <p>
                    The following graph tallies the number of occurances of both fireballs and orbital decays by month enabling us 
                    to delve deeper into how an increase in orbital decays could potentially result in more fireballs being detected.
                    In addition, this also helps to visualize the problem posed by orbital debris, as many of the orbital decays displayed here are actually defunct spacecraft which have been orbiting uncontrolled for years.
                </p>
                <div className="g-div">
                <Plot
                    data={ [{name: "LOADING...", type: 'bar', x: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], y: [0,0,0,0,0,0,0,0,0,0,0,0]}] }
                    layout={ 
                        {
                            width: 1000, 
                            height: 700, 
                            title: 'Loading...',
                            yaxis: {title: {text: "Total # of Occurances"}}
                        }
                    }
                />
                </div>
                <p>
                    We can see a similar pattern between both the Fireball and orbital decays. In addition to following a similar pattern, both fireballs and orbital decays have their maximums in the same month, October.
                    However, this could be a coincidence considering that the month with the fewest number of fireballs also has the second highest number of orbital decays. 
                    Nevertheless, it does appear that there is something further to explore here as to why these patterns have emerged.
                </p>
            </div>
            </>
        );
    

        return (
            <>
            <br></br>
            <div className="gform">
                <h2>Total number of fireballs and orbital debris by month (1988 - 2022)</h2>
                <p>
                    The following graph tallies the number of occurances of both fireballs and orbital decays by month enabling us 
                    to delve deeper into how an increase in orbital decays could potentially result in more fireballs being detected.
                    In addition, this also helps to visualize the problem posed by orbital debris, as many of the orbital decays displayed here are actually defunct spacecraft which have been orbiting uncontrolled for years.
                </p>
                <div className="g-div">
                <Plot
                    data={ dataToPlot }
                    layout={
                        {
                            width: 1000, 
                            height: 700, 
                            title: 'Fireballs Over Time Grouped By Month',
                            yaxis: {title: {text: "Total # of Occurances"}},
                            annotations: [
                                {
                                    x: "January",
                                    y: 194,
                                    xanchor: 'center',
                                    yanchor: 'bottom',
                                    text: "Orbital Decays Minimum",
                                    font:{
                                        family: 'Arial',
                                        size: 10,
                                    },
                                    showarrow: true
                                },
                                {
                                    x: "September",
                                    y: 70,
                                    xanchor: 'center',
                                    yanchor: 'bottom',
                                    text: "Fireballs Minium",
                                    font:{
                                        family: 'Arial',
                                        size: 10,
                                    },
                                    showarrow: true
                                },
                                {
                                    x: "October",
                                    y: 89,
                                    xanchor: 'center',
                                    yanchor: 'bottom',
                                    text: "Fireballs Maximum",
                                    font:{
                                        family: 'Arial',
                                        size: 10,
                                    },
                                    showarrow: true
                                },
                                {
                                    x: "October",
                                    y: 282,
                                    xanchor: 'center',
                                    yanchor: 'bottom',
                                    text: "Orbital Decays Maximum",
                                    font:{
                                        family: 'Arial',
                                        size: 10,
                                    },
                                    showarrow: true
                                },
                            ],
                        }
                    }
                    config={config}
                />
                </div>
                <p>
                    We can see a similar pattern between both the Fireball and orbital decays. In addition to following a similar pattern, both fireballs and orbital decays have their maximums in the same month, October.
                    However, this could be a coincidence considering that the month with the fewest number of fireballs also has the second highest number of orbital decays. 
                    Nevertheless, it does appear that there is something further to explore here as to why these patterns have emerged.
                </p>
            </div>
            </>
        );
    }
}

export default GraphFireballsByMonth;