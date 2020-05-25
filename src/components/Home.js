import React from "react";
import { Scatter } from "react-chartjs-2";

import { generateClusterEllipse, generateClusterCircle, generateClusterArc, generateNoise, shuffle } from "../utils/generateClusters";

const Home = () => {

    let ellipse1 = {
        numberOfPoints: 200,
        centerX: 60,
        centerY: 20,
        radiusX: 20,
        radiusY: 7,
        rotationAngleDegrees: 30,
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 5
    };

    let ellipse2 = {
        numberOfPoints: 200,
        centerX: 80,
        centerY: 70,
        radiusX: 12,
        radiusY: 20,
        rotationAngleDegrees: 0,
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
        angleDegrees: 30,
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
        angleDegrees: 30,
        direction: "greater",
        randomOffset: 0.1,
        percentChanceOfAddingOutsidePoint: 10
    };

    let clusters = [generateClusterEllipse(ellipse1), generateClusterEllipse(ellipse2), generateClusterCircle(circle1), generateClusterArc(arc1), generateClusterArc(arc2)];

    // get the bounding box of the entire set of points
    let boundingBoxOverall = {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    }

    let combinedPoints = [];

    clusters.forEach(cluster => {

        // update bounding box
        if (!boundingBoxOverall.minX || cluster.boundingBox.minX < boundingBoxOverall.minX)
        { boundingBoxOverall.minX = cluster.boundingBox.minX}
        
        if (!boundingBoxOverall.maxX || cluster.boundingBox.maxX > boundingBoxOverall.maxX)
            { boundingBoxOverall.maxX = cluster.boundingBox.maxX}

        if (!boundingBoxOverall.minY || cluster.boundingBox.minY < boundingBoxOverall.minY)
            { boundingBoxOverall.minY = cluster.boundingBox.minY}
        
        if (!boundingBoxOverall.maxY || cluster.boundingBox.maxY > boundingBoxOverall.maxY)
            { boundingBoxOverall.maxY = cluster.boundingBox.maxY}

        combinedPoints = combinedPoints.concat(cluster.points);
    })

    // generate noise    
    let noiseSettings = {
        numberOfPoints: 100,
        minX: boundingBoxOverall.minX,
        maxX: boundingBoxOverall.maxX,
        minY: boundingBoxOverall.minY,
        maxY: boundingBoxOverall.maxY,
        randomOffset: 0.1
    }

    let noisePoints = generateNoise(noiseSettings);

    // add noise points and remove duplicates
    combinedPoints = combinedPoints.concat(noisePoints.points);
    combinedPoints = combinedPoints.filter((point, index) => combinedPoints.indexOf(point) === index);

    shuffle(combinedPoints);

    let chartJSData = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#333333",
                data: combinedPoints

            }
            // {
            //     label: "Scatter Plot #1",
            //     pointBackgroundColor: "#009966",
            //     data: cluster1.points
            // },
            // {
            //     pointBackgroundColor: "#0099FF",
            //     data: cluster2.points
            // },
            // {
            //     pointBackgroundColor: "#FF9966",
            //     data: cluster3.points
            // },
            // {
            //     pointBackgroundColor: "#9933FF",
            //     data: cluster4.points
            // },
            // {
            //     pointBackgroundColor: "#CC3300",
            //     data: cluster5.points
            // },
            // {
            //     pointBackgroundColor: "#333333",
            //     data: cluster6.points
            // }

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