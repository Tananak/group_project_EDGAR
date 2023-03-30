//import { Alert } from 'bootstrap'
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import decayData from '../decayData.json';
import meteorShowerData from "../meteorShowerData.json";
import solarStormData from "../solarStormData.json";

class Form extends Component{

    constructor(props) {
        super(props)
        // Default state values
        this.state = {
            chartType: 'line',
            startDate: "1988-04",
            endDate: "2022-10",
            DataisLoaded: false,
            fireballJson: {},
            decayJson: [],
            dataToPlot: [{name: "LOADING...", type: 'scatter', x: [1, 2, 3], y: [1, 2, 3]}],
            annotationData: [],
            config: {
                displaylogo: false,
            }
        }
    }

    // API call to fireballs api
    componentDidMount() {
        fetch("https://api.allorigins.win/raw?url=https://ssd-api.jpl.nasa.gov/fireball.api", {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((json) => {
            // Get all graph data within the start and end dates
            this.getGraphData(this.state.startDate, this.state.endDate, json);
            // Update state
            this.setState({
                DataisLoaded: true,
                fireballJson: json,
            });
        });
    }

    handleChartTypeChange = (event) => {
        let updatedDataToPlot = this.state.dataToPlot;
        for (let i=0; i < updatedDataToPlot.length; i++) {
            // Change the trace type for all given traces
            updatedDataToPlot[i]["type"] = event.target.value;
        }
        // Update the state value of the data to be plotted to the newly updated value
        this.setState({
            dataToPlot:  updatedDataToPlot
        })
    }

    handleStartDateChange = (event) => {
        // Update the state value to the given start date
        this.setState({
            startDate: event.target.value
        })
        this.getGraphData(event.target.value, this.state.endDate, this.state.fireballJson);
    }

    handleEndDateChange = (event) => {
        // Update the state value to the given end date
        this.setState({
            endDate: event.target.value
        })
        this.getGraphData(this.state.startDate, event.target.value, this.state.fireballJson);
    }

    getGraphData(startDate, endDate, json) {

        // Get the list of all possible x_values within the start and end dates
        let x_values = this.getAllX_Values(startDate, endDate);
        
        // Get all fireball and decay data in the range of x_values
        let data = [
            this.getFireballData(x_values, json), 
            this.getDecayData(x_values),
        ];

        // Get all meteor shower data in the range of x_values
        this.getMeteorShowerData(x_values).forEach((element) => {
            data.push(element);
        });
        // Get all solar storm data in the range of x_values
        this.getSolarStormData(x_values).forEach((element) => {
            data.push(element);
        });

        // Define annotations
        let annotations = [
            {
                x: "1989-03",
                y: 22,
                xanchor: 'center',
                yanchor: 'bottom',
                text: "March 1989 Geomagnetic Storm",
                font:{
                    family: 'Arial',
                    size: 10,
                },
                showarrow: true
            },
            {
                x: "2005-04",
                y: 10,
                xanchor: 'center',
                yanchor: 'bottom',
                text: "Lyrid Meteor Shower 2005",
                font:{
                    family: 'Arial',
                    size: 10,
                },
                showarrow: true
            },
        ];
        let annotationData = [];
        // Iterate all annotations
        annotations.forEach((annotation) => {
            // Check if the date of this annotation is within the given range
            if (annotation["x"] >= x_values[0] && annotation["x"] <= x_values[x_values.length-1]) {
                // Push the annotation
                annotationData.push(annotation);
            }
        });
        
        // Update plot component data
        this.setState({
            dataToPlot: data,
            annotationData: annotationData
        });
    }

    getAllX_Values(startDate, endDate) {
        let x_values = [];
        var y = parseInt(startDate.split('-')[0]);
        var m = parseInt(startDate.split('-')[1]);
        var max_y = parseInt(endDate.split('-')[0]);
        var max_m = parseInt(endDate.split('-')[1]);

        // Get all possible yyyy-mm dates in the dataset
        for (y; y <= max_y; y++ ) { // loop through all possible years
            for (m; m <= 12; m++) { // loop through all possible months
                // Check if this is the last possible year
                if (y === max_y) {
                    // Check if this month is less than the last possible month
                    if (m <= max_m) {
                        x_values.push(String(y)+"-"+String(m).padStart(2, '0'));
                    }
                } else {
                    x_values.push(String(y)+"-"+String(m).padStart(2, '0'));
                }
            }
            m = 1;
        }
        return x_values; // Returns a list of x_values in between the start and end dates passed in
    }

    getFireballData(x_values, json) {
        let foundDates = []; // list of all dates which had a fireball occurr
        let y_values = [];   // count of fireballs that occurred in this yyyy-mm
        if (Object.keys(json).length !== 0) {
            // Get all found dates from the fireballs json
            json.data.forEach((result) => {
                // convert the date in format yyyy-mm-dd into yyyy-mm
                let date = result[0].substring(0, result[0].indexOf('-') + 3);
                // Check if this date is within the given range
                if (date >= x_values[0] && date <= x_values[x_values.length-1]) {
                    foundDates.push(date); // Push date to foundDates array
                }
            });
            

            var x = 0;
            var i = 0;
            // Loop through all possible unique yyyy-mm dates
            for (x in x_values) {
                let occurances = 0;
                // loop through foundDates to sum number of occurances of this unique yyyy-mm
                for (i in foundDates) {
                    if (foundDates[i] === x_values[x]) {
                        occurances++;
                    }
                }
                // push total # of occurances of fireballs in this yyyy-mm
                y_values.push(occurances);
            }

            return {
                name: "Fireballs",
                type: this.state.chartType,
                x: x_values,
                y: y_values,
            };
        }
    }

    uniqueKeyValues(arr, key) {
        return [...new Set(arr.map((obj) => {return obj[key]}))];
    }

    getDecayDataByObjectName(object_name) {
        let object_found = false;
        let found_element = null;
        // Iteration through all decay data entries
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

    getCountDecayOccurances(decayJson, x_value) {
        var countOccurances = 0;
        // Iterate through all decay data entries
        decayJson.forEach((result) => {
            // convert the date in format yyyy-mm-dd into yyyy-mm
            let date = result["DECAY_EPOCH"].substring(0, result["DECAY_EPOCH"].indexOf('-') + 3);
            if (date === x_value) {
                countOccurances++;
            }
        });
        return countOccurances;
    }

    getDecayData(x_values) {                
        const uniqueDecayObjectNames = this.uniqueKeyValues(decayData, "OBJECT_NAME");
        let decayJson = [];
        let y_values = [];

        for (let i = 0; i < uniqueDecayObjectNames.length; i++) {
            // Get object by name
            let element = this.getDecayDataByObjectName(uniqueDecayObjectNames[i])
            // If element is not an empty dict
            if (element != null) {
                decayJson.push(element);
            }
        }

        // Iterate through all x values
        for (let i = 0; i < x_values.length; i++) {
            y_values.push(this.getCountDecayOccurances(decayJson, x_values[i]));
        }
        
        return {
            name: "Atmospheric Re-Entries (Man-made Spacecraft)",
            type: this.state.chartType,
            x: x_values,
            y: y_values,
        };
    }

    getMeteorShowerData(x_values) {
        let showerNames = [];
        let meteorShowerDataToPlot = {};
        meteorShowerData.forEach((element) => {
            let elementStart = element["start_date"].split("-")[0] + "-" + element["start_date"].split("-")[1];
            let elementEnd = element["end_date"].split("-")[0] + "-" + element["end_date"].split("-")[1];
            if (elementStart >= x_values[0] && elementEnd <= x_values[x_values.length-1]) {
                // If this is a repeat occurance of this shower
                if (showerNames.includes(element.name)) {
                    meteorShowerDataToPlot[element.name + " meteor shower"]["x"].push(elementStart);
                    meteorShowerDataToPlot[element.name + " meteor shower"]["y"].push(0);
                }
                // Add initial element
                else {
                    meteorShowerDataToPlot[element.name + " meteor shower"] = {type: "scatter", x: [elementStart], y: [0]};
                    showerNames.push(element.name);
                }
            }
        });

        let data = [];
        for (var key in meteorShowerDataToPlot) {
            data.push({
                name: key,
                type: "scatter",
                x: meteorShowerDataToPlot[key]["x"],
                y: meteorShowerDataToPlot[key]["y"],
            });
        }

        return data;
    }

    getSolarStormData(x_values) {
        let data = [];
        solarStormData.forEach((element) => {
            if (element["date"] >= x_values[0] && element["date"] <= x_values[x_values.length-1]) {
                data.push({
                    name: element["name"], 
                    type: "scatter", 
                    x: [element["date"]], 
                    y: [0]
                });
            }
        });
        
        return data;
    }

    render() {

        const {DataisLoaded, dataToPlot, annotationData, config} = this.state;

        if (!DataisLoaded) return (
            <div className="gform">
                    <h2>EDGAR Visualization Tool</h2>
                    <div className="g-div">
                        <Plot
                            data={ [{name: "LOADING...", type: 'bar', x: [0], y: [0]}] }
                            layout={ 
                                {
                                    width: 1000, 
                                    height: 700, 
                                    title: 'Loading...',
                                    yaxis: {title: {text: "Total # of Occurances"}}
                                }
                            }
                            config={config}
                        />
                    </div>
            </div>
        );


        return (
            <>
                <div className="gform">
                    <h2>EDGAR Visualization Tool</h2>
                    <div className="g-div">
                        <Plot
                            data={dataToPlot}
                            layout={ 
                                {
                                    width: 1000, 
                                    height: 700, 
                                    xaxis: {title: {text: "Time"}},
                                    yaxis: {title: {text: "Occurances"}},
                                    annotations: annotationData,
                                }
                            }
                        />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="f-div">
                            <label id="ct" className="f-label">Chart Type</label>
                            <select  id="chart" onChange={this.handleChartTypeChange}>
                                <option value="line">Line</option>
                                <option value="bar">Bar</option>
                            </select>
                        </div>
                        <div className="f-div">
                            <label id="sd" className="f-label">Start Date</label>
                            <input
                                className="f-input"
                                type="month"
                                min="1988-04"
                                max={this.state.endDate}
                                value={this.state.startDate}
                                onChange={this.handleStartDateChange}
                            />
                        </div>
                        <div className="f-div">
                            <label id="ed" className="f-label">End Date</label>
                            <input
                                className="f-input"
                                type="month"
                                min={this.state.startDate}
                                max="2022-10"
                                value={this.state.endDate}
                                onChange={this.handleEndDateChange}
                            />
                        </div>
                        {/* <button type="submit">Submit</button> */}
                    </form>
                </div>
            </>
        )
    }
}

export default Form