import React from "react";
import { Scatter } from "react-chartjs-2";

import { generateClusterEllipse, generateClusterCircle, generateClusterArc, generateNoise } from "../utils/generateClusters";

const Home = () => {

    let ellipse1 = {
        numberOfPoints: 100,
        centerX: 10,
        centerY: 10,
        radiusX: 20,
        radiusY: 7,
        rotationAngle: 0,
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let ellipse2 = {
        numberOfPoints: 100,
        centerX: 80,
        centerY: 70,
        radiusX: 12,
        radiusY: 20,
        rotationAngle: 0,
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let circle1 = {
        numberOfPoints: 100,
        centerX: 30,
        centerY: 90,
        radius: 10,
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let arc1 = {
        numberOfPoints: 100,
        centerX: 20,
        centerY: 50,
        radiusOuter: 20,
        radiusInner: 15,
        angle: 30,
        direction: "less",
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let arc2 = {
        numberOfPoints: 100,
        centerX: 35,
        centerY: 50,
        radiusOuter: 20,
        radiusInner: 15,
        angle: 30,
        direction: "greater",
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let noise1 = {
        numberOfPoints: 100,
        minX: 0,
        minY: 0,
        maxX: 100,
        maxY: 100,
        randomOffset: 0.1
    }

    let cluster1 = generateClusterEllipse(ellipse1);
    let cluster2 = generateClusterEllipse(ellipse2);
    let cluster3 = generateClusterCircle(circle1);
    let cluster4 = generateClusterArc(arc1);
    let cluster5 = generateClusterArc(arc2);
    let cluster6 = generateNoise(noise1);

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
            },
            {
                pointBackgroundColor: "#333333",
                data: cluster6.map((point, id) => { return {"x": point[0], "y": point[1]}})
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