import React from "react";
import { ScatterPlot } from "reaviz";
import { Scatter } from "react-chartjs-2";

import { generateClusterEllipse } from "../utils/generateClusters";

const Home = () => {

    let cluster1 = generateClusterEllipse(100, 10, 10, 2, 7, 0, 1);
    let clusterReformatted = cluster1.map((point, id) => { return {"key": point[0], "data": point[1], id}});

    let chartJSData = {
        datasets: [
            {
                label: 'Cluster 1',
                fill: true,
                backgroundColor: "#666666",
                pointBorderColor: "#666666",
                pointBackgroundColor: "#666666",
                pointBorderWidth: 2,
                pointHoverRadius: 15,
                pointHoverBackgroundColor: "#999999",
                pointHoverBorderColor: "#999999",
                pointHoverBorderWidth: 0,
                pointRadius: 10,
                pointHitRadius: 15,
                data: cluster1.map((point, id) => { return {"x": point[0], "y": point[1]}})
            }
        ]
    };

    return (
        <>
            <h1>Home</h1>
            <ScatterPlot height={300} width={300} data={clusterReformatted} />
            <Scatter data={chartJSData} />
        </>
    )
}

export default Home;