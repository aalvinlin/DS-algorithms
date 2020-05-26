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
    let separatedClusters = useDbscan(simpleScatterPlot, 3, 2);

    let colors = ["#FF9966", "#339966", "#66CCFF", "#333399", "#FFFF66", "#996633", "#333333", "#CC9966", "#CCCCCC", "#996600"];

    // format clusters for chartJS to display
    let datasets = separatedClusters.map((cluster, index) => {
        return {
            label: "Cluster #" + index,
            pointBackgroundColor: colors[index],
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
                        max: 10
                    }
                }],
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        // max: 50
                        max: 10
                    }
                    
                }]
            }
        }

    return (
        <>
            <h1>DBSCAN</h1>
            <Scatter data={chartJSData} options={options} />
        </>
    )

}

export default Dbscan;