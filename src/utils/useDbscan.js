import { sortCoordinates } from "./sortCoordinates";

export const useDbscan = (points, epsilon, requiredPointsInRadius) => {

    sortCoordinates(points);

    // add index to each point
    points = points.map((point, index) => { return {...point, index}});

    let currentPoint = points[0];

    console.log("starting point is", currentPoint)

    let neighbors = [];
    let othersInXRange = [];
    let outliers = new Set();
    let knownClusters = [];

    let clustersNeighborsBelongTo = new Set();

    for (let i = currentPoint.index + 1; points[i] && Math.abs(currentPoint.x - points[i].x) <= epsilon; i++)
        {
            console.log("point #", i)

            let neighbor = points[i];
            let distanceToNeighbor = Math.sqrt(Math.abs(currentPoint.x - neighbor.x) ** 2 + Math.abs(currentPoint.y - neighbor.y) ** 2);

            if (distanceToNeighbor <= epsilon)
                {
                    // potential neighbor found
                    console.log("neighbor found!")
                    neighbors.push(neighbor);

                    // keep track of all cluster IDs that neighbors belong to
                    // if more than one, will need to merge them all later
                    if (neighbor.clusterID)
                        { clustersNeighborsBelongTo.add(clusterID); }
                }
            else
                {
                    othersInXRange.push(neighbor);
                }
        }


    // determine which cluster to place the point in
    // no known clusters: create a new one with an ID of 0
    if (knownClusters.length === 0)
        {
            knownClusters[0] === new Set();

            // create a new cluster ID to use
            currentPoint.clusterID = 0;

            // update all neighbors with new cluster ID
            for (let i = 0; i < neighbors.length; i++)
                { neighbors[i].clusterID = 0; }
        }
    // one cluster found: update current point and its neighbors
    else if (clustersNeighborsBelongTo.length === 1)
        {
            let knownClusterID = clustersNeighborsBelongTo[0];
            
            // update cluster ID for current point
            currentPoint.clusterID = knownClusterID;
            
            // add current point to cluster
            knownClusters[knownClusterID].add(currentPoint);

            // update all neighbors with known cluster ID
            // also update cluster with each point
            for (let i = 0; i < neighbors.length; i++)
                {
                    neighbors[i].clusterID = knownClusterID;
                    knownClusters[knownClusterID].add(neighbors[i]);
                }
        }
    // multiple clusters found: merging will have to take place
    // merge into the cluster with the smallest ID number
    else
        {

        }

    // if the current point has no neighbors, it is an outlier
    if (neighbors.length === 0)
        {
            outliers.add(currentPoint); 
            currentPoint.type = "outlier";
        }
    
    // if the current point has at least requiredPointsInRadius points, it is a core point
    else if (neighbors.length + 1 >= requiredPointsInRadius)
        {
            currentPoint.type = "core";

            // any neighbors with an unknown status can now be updated to a boundary point
            for (let i = 0; i < neighbors.length; i++)
                {
                    if (!neighbors[i].type || neighbors[i].type === "?")
                        {
                            neighbors[i].type = "boundary";
                        }
                }
        }
    
    // if the current point has at least one neighbor but fewer than requiredPointsInRadius,
    // it could either be an outlier or a boundary point
    else
        {
            currentPoint.type = "?";
        }

    let circleForScale = [];

    // create a ring of points surrounding the target point
    for (let angle = 0; angle < 360; angle += 30)
        {
            circleForScale.push({
                x: currentPoint.x + epsilon * Math.cos(angle / 180 * Math.PI),
                y: currentPoint.y + epsilon * Math.sin(angle / 180 * Math.PI)
            })
        }

    console.log("current point:", currentPoint);
    console.log("neighbors:", neighbors);

    return [neighbors, points, circleForScale];
}