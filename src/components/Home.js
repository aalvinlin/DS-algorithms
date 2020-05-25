import React from "react";
import { Scatter } from "react-chartjs-2";

import { generateClusterEllipse, generateClusterCircle, generateClusterArc } from "../utils/generateClusters";

const Home = () => {

    let cluster1 = generateClusterEllipse(100, 10, 10, 20, 7, 0, 0.1);
    let cluster2 = generateClusterEllipse(100, 80, 70, 12, 20, 0, 0.1);
    let cluster3 = generateClusterCircle(100, 30, 90, 10, 0.1);
    let cluster4 = generateClusterArc(100, 20, 50, 20, 15, 30, "less", 0.1);
    let cluster5 = generateClusterArc(100, 35, 50, 20, 15, 30, "greater", 0.1);

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
            },
            {
                pointBackgroundColor: "#9933FF",
                data: cluster4.map((point, id) => { return {"x": point[0], "y": point[1]}})
            },
            {
                pointBackgroundColor: "#CC3300",
                data: cluster5.map((point, id) => { return {"x": point[0], "y": point[1]}})
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