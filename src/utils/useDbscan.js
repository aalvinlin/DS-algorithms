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


    // determine which set to place the point in
    // if there are no existing sets, or if no point (none of the current point nor its neighbors) is part of a set, start a new one
    if (knownClusters.length === 0)
        {
            knownClusters[0] === new Set();

            currentPoint.clusterID = 0;

            for (let i = 0; i < neighbors.length; i++)
                { neighbors[i].clusterID = 0; }
        }
    else if (knownClusters.length === 1)
        {

        }
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