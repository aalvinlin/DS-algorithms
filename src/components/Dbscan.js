import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";

import { simpleScatterPlot, scatterPlot1, scatterPlot2, scatterPlot3 } from "../data/data";

import { useDbscan } from "../utils/useDbscan";

const Dbscan = () => {

    // chartJS bug? can't go back to first option after selecting the others.
    // happens even when simpleScatterPlot is last in the list
    let possiblePlots = [simpleScatterPlot, scatterPlot1, scatterPlot2, scatterPlot3];
    let possiblePlotNames = ["Simple Plot", "Two Arcs", "Three Clusters", "Multiple Clusters"];

    let [chosenPlot, setChosenPlot] = useState(0);
    let [chosenRadius, setChosenRadius] = useState(2.5);
    let [chosenDensity, setChosenDensity] = useState(2);

    let [separatedClusters, setSeparatedClusters] = useState([]);

    const submitForm = () => {

        setSeparatedClusters(useDbscan(possiblePlots[chosenPlot], chosenRadius, chosenDensity));
    }

    // console.log("#######################################");
    // console.log("the results are...", separatedClusters);
    // console.log("#######################################");

    let colors = ["#CCCCFF", "#33CC99", "#FF66CC", "#33CCFF", "#FF9933", "#339966", "#66CCFF", "#333399", "#FFFF66", "#996633", "#333333", "#CC9966", "#996600"];

    // format clusters for chartJS to display
    let datasets = separatedClusters.map((cluster, index) => {
        return {
            label: (index === 0)? "Outliers" : "Cluster " + index,
            backgroundColor: colors[index],
            pointBackgroundColor: colors[index],
            pointBorderRadius: 0,
            pointRadius: 5,
            data: cluster
        }
    })

    let chartJSData = { datasets };
    let options = {
            scales: {
                xAxes: [{
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                    }
                }],
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                    }
                    
                }]
            }
        }

    let inputData = {
        datasets: [
            {
            label: "Data point",
            backgroundColor: "#33CCFF",
            pointBackgroundColor: "#33CCFF",
            pointBorderRadius: 0,
            pointRadius: 5,
            data: possiblePlots[chosenPlot]
            }
        ]
    }

    return (
        <div className="try">
            <h2 className="alternateColor">Try using DBSCAN</h2>

            <p>Select a dataset from the list below, or create your own.</p>

            <div className="plotSelection">
                <ol>
                    {
                        possiblePlotNames.map((name, index) => <li className={"plotOption" + (chosenPlot === index ? " selectedPlot" : "")} onClick={() => setChosenPlot(index)}>{name}</li>)
                    }
                </ol>
                
                <form name="plotParameters" className="plotParameters" onSubmit={event => event.preventDefault()}>
                    <label>
                        <em>&epsilon;</em> (radius)
                        <input type="text" name="plotRadius" value={chosenRadius} onChange={event => setChosenRadius(event.target.value)} />
                    </label>

                    <label>
                        <em>n</em> (density)
                        <input type="text" name="plotDensity" value={chosenDensity} onChange={event => setChosenDensity(event.target.value)} />
                    </label>

                    <button onClick={submitForm}>Process Data</button>
                </form>
            </div>

            <h2>Input Data</h2>
            <Scatter data={inputData} options={options} />
            
            <h2>Results of using DBSCAN</h2>
            <Scatter data={chartJSData} options={options} />
             
        </div>
    )

}

export default Dbscan;