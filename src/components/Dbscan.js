import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3, simpleScatterPlot } from "../data/data";

import { createClusters } from "../utils/generateClusters";
import { useDbscan } from "../utils/useDbscan";

const Dbscan = () => {

    let scatterPlot = createClusters(set2);
    
    // sort by increasing x-coordinates
    // if x-coordinates are the same, sort by increasing y-coordinates
    // let separatedClusters = useDbscan(scatterPlot, 5, 5);
    let separatedClusters = useDbscan(simpleScatterPlot, 2.5, 2);

    console.log("#######################################");
    console.log("the results are...", separatedClusters);
    console.log("#######################################");

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

    console.log(datasets)

    let chartJSData = { datasets };
    let options = {
            scales: {
                xAxes: [{
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        // max: 50
                        // max: 10
                    }
                }],
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        // max: 50
                        // max: 10
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
            data: simpleScatterPlot
            }
        ]
    }

    return (
        <div className="try">
            <h2 className="alternateColor">Try using DBSCAN</h2>
            
            <h2>Input Data</h2>
            <Scatter data={inputData} options={options} />
            
            <h2>Results of using DBSCAN</h2>
            <Scatter data={chartJSData} options={options} />
            
        </div>
    )

}

export default Dbscan;