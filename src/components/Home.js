import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3, simpleScatterPlot } from "../data/data";
import { createClusters } from "../utils/generateClusters";

const Home = () => {

    let scatterPlot1 = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#CCCCFF",
                data: createClusters(set2)

            }
        ]
    };

    let scatterPlot2 = {
        datasets: [
            {
                label: "Scatter Plot #2",
                pointBackgroundColor: "#CCCCFF",
                data: createClusters(set3)

            }
        ]
    };

    return (
        <div className="home">
            <h1>Data Science Algorithms</h1>

            <h2>DBSCAN</h2>
            <h3>Density-based spatial clustering of applications with noise</h3>
            

            <div className="home-intro">

                <p>
                    DBSCAN is an algorithm that categorizes data points into clusters according to how close they are to each other.
                </p>

                <div className="example1">
                    <Scatter data={scatterPlot1} />
                    <Scatter data={scatterPlot2} />
                </div>

                <p>
                    DBSCAN requires two parameters to specify the density of clusters:
                    <ol>
                        <li>the distance from each point (epsilon, <em>&epsilon;</em>) where additional points should be found</li>
                        <li>the number of points (<em>k</em>) that should be in the circle with radius <em>&epsilon;</em></li>
                    </ol>
                </p>

            </div>
        </div>
    )
}

export default Home;