import React from "react";
import { ScatterPlot } from "reaviz";

import { generateClusterEllipse } from "../utils/generateClusters";

const Home = () => {

    let cluster1 = generateClusterEllipse(10, 10, 2, 7, 0, 1);

    console.log(cluster1)

    return (
        <>
            <h1>Home</h1>
            <ScatterPlot height={300} width={300} data={cluster1} />
        </>
    )
}

export default Home;