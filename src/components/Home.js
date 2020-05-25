import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1 } from "../data/data";
import { generateClusterEllipse, generateClusterCircle, generateClusterArc, combineAndAddNoise } from "../utils/generateClusters";

const Home = () => {

    let scatterPlot1 = combineAndAddNoise(
            [generateClusterEllipse(set1.ellipse1), generateClusterEllipse(set1.ellipse2), generateClusterCircle(set1.circle1), generateClusterArc(set1.arc1), generateClusterArc(set1.arc2)],
            true,
            set1.noiseSettings);

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