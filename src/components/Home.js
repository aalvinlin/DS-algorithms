import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2 } from "../data/data";
import { createClusters } from "../utils/generateClusters";

const Home = () => {

    let scatterPlot1 = createClusters(set1);
    let scatterPlot2 = createClusters(set2);

    let chartJSData = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#333333",
                data: scatterPlot1

            },
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#339933",
                data: scatterPlot2

            },
        ]
    };

    return (
        <>
            <h1>Home</h1>
            <Scatter data={chartJSData} />
        </>
    )
}

export default Home;