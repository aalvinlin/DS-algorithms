import React from "react";
import { ScatterPlot } from "reaviz";
import { Scatter } from "react-chartjs-2";

import { generateClusterEllipse, generateClusterCircle } from "../utils/generateClusters";

const Home = () => {

    let cluster1 = generateClusterEllipse(100, 10, 10, 20, 7, 0, 1);
    let cluster2 = generateClusterEllipse(100, 80, 70, 12, 20, 0, 0);
    let cluster3 = generateClusterCircle(100, 30, 90, 10, 0);
    let clusterReformatted = cluster1.map((point, id) => { return {"key": point[0], "data": point[1], id}});

    let chartJSData = {
        datasets: [
            {
                pointBackgroundColor: "#009966",
                data: cluster1.map((point, id) => { return {"x": point[0], "y": point[1]}})
            },
            {
                pointBackgroundColor: "#0099FF",
                data: cluster2.map((point, id) => { return {"x": point[0], "y": point[1]}})
            },
            {
                pointBackgroundColor: "#FF9966",
                data: cluster3.map((point, id) => { return {"x": point[0], "y": point[1]}})
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