import React from "react";
import { Scatter } from "react-chartjs-2";

import { set1, set2, set3, simpleScatterPlot } from "../data/data";
import { createClusters } from "../utils/generateClusters";

import example2a from "url:../images/DBSCAN_intro_2a.png";
import example2b from "url:../images/DBSCAN_intro_2b.png";
import example3a from "url:../images/DBSCAN_intro_3a.png";
import example3b from "url:../images/DBSCAN_intro_3b.png";

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

            <h2 className="alternateColor">Learn about DBSCAN</h2>

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

            <div className="exampleImgContainer">
                <div className="example2a">
                    <img src={example2a} />
                    5 points in circle.<br />
                    Minimum met.
                </div>
                <div className="example2b">
                    <img src={example2b} />
                    3 points in circle.<br />
                    Minimum not met.
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

            <hr />

            <p>The required minimum <em>n</em> is again 5 for the two examples below.</p>

            <div className="exampleImgContainer">
                <div className="example3a">
                    <img src={example3a} />
                    <em class="term">boundary point</em><br />
                    There is at least one core point in the circle.
                </div>
                <div className="example3b">
                    <img src={example3b} />
                    <em class="term">outlier</em><br />
                    None of the other points in the circle are core points.
                </div>
            </div>

        </div>
    )
}

export default Home;