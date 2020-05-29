import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3, simpleScatterPlot } from "../data/data";
import { createClusters } from "../utils/generateClusters";

import image1 from "url:../images/DBSCAN_intro_1.png";
import image2 from "url:../images/DBSCAN_intro_2.png";

const Home = () => {

    let scatterPlot1 = {
        datasets: [
            {
                label: "Scatter Plot #1",
                pointBackgroundColor: "#33CCFF",
                data: createClusters(set2)

            }
        ]
    };

    let scatterPlot2 = {
        datasets: [
            {
                label: "Scatter Plot #2",
                pointBackgroundColor: "#33CCFF",
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
                        <li>the number of points (<em>n</em>) that should be in the circle with radius <em>&epsilon;</em></li>
                    </ol>

                    For each point in the dataset, a circle with radius <em>&epsilon;</em> is drawn around it. The number of points inside the circle is then checked against the specified minimum (<em>n</em>).
                </p>

                <hr />

                <p>Suppose the required minimum <em>n</em> is 5 for both of the examples below.</p>

                <div className="example2ImgContainer">
                    <div className="example2a">
                        <img src={image1} />
                        5 points in circle.
                    </div>
                    <div className="example2b">
                        <img src={image2} />
                        3 points in circle.
                    </div>
                </div>

                <hr />

                <p>A <em class="term">core point</em> has at least the minimum number of points in its circle. It will be part of a cluster.</p>

                <p>
                    A point that does not meet the minimum number of points in its circle might be either a <em class="term">boundary point</em> or an <em class="term">outlier</em>.
                    <ul>
                        <li>A <em class="term">boundary point</em> is not a core point, but has at least one core point within its circle. It will be part of the same cluster as the core point.</li>
                        <li>An <em class="term">outlier</em> does not have any core points in its circle. It will not be part of any cluster.</li>
                    </ul>
                </p>


            </div>
        </div>
    )
}

export default Home;