import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2 } from "../data/data";
import { generateClusterEllipse, generateClusterCircle, generateClusterArc, combineAndAddNoise } from "../utils/generateClusters";

const Home = () => {

    let data = set2;

    let scatterPlot1 = combineAndAddNoise(
            // [generateClusterEllipse(data.ellipse1), generateClusterEllipse(data.ellipse2), generateClusterCircle(data.circle1), generateClusterArc(data.arc1), generateClusterArc(data.arc2)],
            [generateClusterCircle(data.circle1), generateClusterCircle(data.circle2), generateClusterCircle(data.circle3)],
            true,
            data.noiseSettings);

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
            <h1>Home</h1>
            <Scatter data={chartJSData} />
        </>
    )
}

export default Home;