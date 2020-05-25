import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3 } from "../data/data";

import { createClusters } from "../utils/generateClusters";
import { useDbscan } from "../utils/useDbscan";

const Dbscan = () => {

    let scatterPlot = createClusters(set2);

    // sort by increasing x-coordinates
    // if x-coordinates are the same, sort by increasing y-coordinates
    let separatedClusters = useDbscan(scatterPlot);

    console.log(scatterPlot)

    let chartJSData = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#333333",
                data: scatterPlot

            }
        ]
    };

    return (
        <>
            <h1>DBSCAN</h1>
            <Scatter data={chartJSData} />
        </>
    )

}

export default Dbscan;