import { sortCoordinates } from "./sortCoordinates";

export const useDbscan = (points, epsilon, requiredPointsInRadius) => {

    sortCoordinates(points);

    // add array index to each point
    points = points.map((point, pointID) => { return {...point, pointID}});

    // keep track of outliers and known clusters
    let outliers = new Set();
    let knownClusters = [];

    for (let currentPointID = 0; currentPointID < points.length; currentPointID += 1)
        {
            let currentPoint = points[currentPointID];

            console.log("⭐ current point ID", currentPointID, currentPoint)

            let neighbors = [];
            let othersInXRange = [];
            
            let clustersNeighborsBelongTo = new Set();

            // keep checking until the next point is too far away
            for (let i = currentPointID + 1; points[i] && Math.abs(currentPoint.x - points[i].x) <= epsilon; i++)
                {
                    console.log("    point #", i, "'s x-value is within range")

                    let neighbor = points[i];
                    let distanceToNeighbor = Math.sqrt(Math.abs(currentPoint.x - neighbor.x) ** 2 + Math.abs(currentPoint.y - neighbor.y) ** 2);

                    if (distanceToNeighbor <= epsilon)
                        {
                            // potential neighbor found
                            console.log("    ✔ neighbor to", currentPointID, "found!", neighbor)
                            neighbors.push(neighbor);

                            // keep track of all cluster IDs that neighbors belong to
                            // if more than one, will need to merge them all later
                            // because clustersNeighborsBelongTo is a set, it is not necessary to check for existence of a clusterID before adding
                            if (neighbor.clusterID)
                                { clustersNeighborsBelongTo.add(neighbor.clusterID); }
                        }
                    else
                        {
                            othersInXRange.push(neighbor);
                        }
                }
            
            // add own clusterID if it exists
            if (currentPoint.clusterID)
                { clustersNeighborsBelongTo.add(currentPoint.clusterID); }

            console.log("🏠 neighbors to point ID", currentPointID, neighbors);
            console.log("    clustersNeighborsBelongTo:", clustersNeighborsBelongTo)


            // determine which cluster to place the point in
            // if the current point has no neighbors, it is an outlier
            if (neighbors.length === 0)
                {
                    outliers.add(currentPoint); 
                    currentPoint.type = "outlier";
                }

            // point is either a boundary point or a core point
            else
                {
                    let clusterIDToAddTo = null;

                    // no known clusters or no points belong to a cluster yet: create a new cluster
                    if (knownClusters.length === 0 || clustersNeighborsBelongTo.size === 0)
                        {
                            // start a new set at the next index for knownClusters
                            clusterIDToAddTo = knownClusters.length;
                            knownClusters[clusterIDToAddTo] = new Set();
                        }
                    // one cluster found: update current point and its neighbors
                    else if (clustersNeighborsBelongTo.size === 1)
                        {
                            // clusterIDToAddTo = clustersNeighborsBelongTo[0];

                            for (let value of clustersNeighborsBelongTo.values())
                                {
                                    clusterIDToAddTo = value;
                                }

                            console.log("contents of the set with only 1 ID...", clustersNeighborsBelongTo.values())
                        }
                    // multiple clusters found: merging will have to take place
                    // merge into the cluster with the smallest ID number
                    else
                        {
                            console.log("contents of the set...multiple clusters?", clustersNeighborsBelongTo.values())

                            console.log("multiple clusters found...size is", clustersNeighborsBelongTo.size)
                        }



                    // update cluster ID for current point
                    // also add current point to cluster
                    currentPoint.clusterID = clusterIDToAddTo;
                    knownClusters[clusterIDToAddTo].add(currentPointID);

                    // update all neighbors with known cluster ID
                    // also update cluster with each point
                    for (let i = 0; i < neighbors.length; i++)
                        {
                            neighbors[i].clusterID = clusterIDToAddTo;
                            knownClusters[clusterIDToAddTo].add(neighbors[i].pointID);
                        }
                    
                    // if the current point has at least requiredPointsInRadius points, it is a core point
                    if (neighbors.length + 1 >= requiredPointsInRadius)
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

                
            console.log("current point status:", currentPoint);
            console.log("neighbors:", neighbors);
            console.log("clusters:", knownClusters);
            console.log("=========================================");
        }

    let outliersFormatted = Array.from(outliers);

    console.log("outliers:", outliersFormatted);
    console.log("clusters:", knownClusters);

    // return [Array.from(outliers)];
    return [outliersFormatted, knownClusters, points];
    // return [neighbors, points, circleForScale];
}