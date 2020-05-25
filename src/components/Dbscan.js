import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3 } from "../data/data";
import { createClusters } from "../utils/generateClusters";
import { sortCoordinates } from "../utils/sortCoordinates";

const Dbscan = () => {

    let scatterPlot1 = createClusters(set2);

    // sort by increasing x-coordinates
    // if x-coordinates are the same, sort by increasing y-coordinates
    sortCoordinates(scatterPlot1);

    console.log(scatterPlot1)

    let chartJSData = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#333333",
                data: scatterPlot1

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