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

            // console.log("⭐ current point ID", currentPointID, currentPoint)

            // keep track of this point's neighbors and which clusters they belong to.
            let neighbors = null;
            let clustersNeighborsBelongTo = new Set();

            if (!currentPoint.neighbors)
                {
                    neighbors = new Set();
                    currentPoint.neighbors = neighbors;
                }
            else
                {
                    neighbors = currentPoint.neighbors;

                    // console.log("🍫 about to add neighbor's cluster IDs...current point is ", currentPointID)

                    // if any neighbors already belong to a cluster, make note of those cluster IDs
                    for (let neighborID of neighbors)
                        {
                            let clusterID = points[neighborID].clusterID;

                            if (clusterID !== undefined)
                                { clustersNeighborsBelongTo.add(clusterID); }
                        }
                }

            // console.log("🛑 Point #", currentPointID,"has the following neighbors:", neighbors)
            // console.log("The neighbors belong to these clusters:", clustersNeighborsBelongTo)

            // keep checking until the next point is too far away
            for (let currentNeighborID = currentPointID + 1; points[currentNeighborID] && Math.abs(currentPoint.x - points[currentNeighborID].x) <= epsilon; currentNeighborID++)
                {
                    // console.log("    point #", currentNeighborID, "'s x-value is within range")
                    // console.log("    all clusters so far:", knownClusters);

                    let neighbor = points[currentNeighborID];
                    let distanceToNeighbor = Math.sqrt(Math.abs(currentPoint.x - neighbor.x) ** 2 + Math.abs(currentPoint.y - neighbor.y) ** 2);

                    if (distanceToNeighbor <= epsilon)
                        {
                            // neighbor found
                            // console.log("    ✔ neighbor to", currentPointID, "found!", neighbor)
                            neighbors.add(neighbor.pointID);

                            // also add current point to neighboring point's list of neighbors
                            // start a new set if the neighboring point does not have one yet
                            if (!neighbor.neighbors)
                                { neighbor.neighbors = new Set(); }
                            
                            neighbor.neighbors.add(currentPointID);

                            // keep track of all cluster IDs that neighbors belong to
                            // if more than one, will need to merge them all later
                            // because clustersNeighborsBelongTo is a set, it is not necessary to check for existence of a clusterID before adding
                            if (neighbor.clusterID)
                                { clustersNeighborsBelongTo.add(neighbor.clusterID); }
                            // else
                            //     { console.log("neighbor #", currentNeighborID, "doesn't have a cluster ID.", neighbor)}
                        }
                }
            
            // /*

            // add own clusterID if it exists
            if (currentPoint.clusterID)
                { clustersNeighborsBelongTo.add(currentPoint.clusterID); }

            // console.log("🏠 neighbors to point ID", currentPointID, neighbors);
            // console.log("    clustersNeighborsBelongTo:", clustersNeighborsBelongTo);
            // console.log("    all clusters so far:", knownClusters);

            // determine which cluster to place the point in
            // if the current point has no neighbors, it is an outlier
            if (neighbors.size === 0)
                {
                    outliers.add(currentPoint); 
                    currentPoint.type = "outlier";
                }

            // /*

            // point is either a boundary point or a core point
            else
                {
                    // console.log("boundary or core...", currentPoint);

                    let clusterIDToAddTo = null;

                    // no known clusters yet: create a new cluster
                    if (knownClusters.length === 0)
                        {
                            // console.log("starting a new cluster.")

                            // start a new set at the next index for knownClusters
                            clusterIDToAddTo = knownClusters.length;
                            knownClusters[clusterIDToAddTo] = new Set();
                        }
                    // no points in radius belong to a cluster
                    else if (clustersNeighborsBelongTo.size === 0)
                        {
                            // console.log(clustersNeighborsBelongTo)
                            // console.log("no neighbors in cluster yet.");
                        }
                    // one cluster found: update current point and its neighbors
                    else if (clustersNeighborsBelongTo.size === 1)
                        {
                            // clusterIDToAddTo = clustersNeighborsBelongTo[0];

                            for (let clusterID of clustersNeighborsBelongTo)
                                {
                                    // console.log(clusterID, "is the current asklefhaskfjasb", clustersNeighborsBelongTo)
                                    clusterIDToAddTo = clusterID;
                                }

                                // console.log("all neighbors belong to the same cluster.", clusterIDToAddTo);

                            // console.log("contents of the set with only 1 ID...", clustersNeighborsBelongTo.values())
                        }
                    // multiple clusters found: merging will have to take place
                    // merge into the cluster with the smallest ID number
                    else
                        {
                            // console.log("neighbors belong to multiple clusters.", clusterIDToAddTo);
                            // console.log("contents of the set...multiple clusters?", clustersNeighborsBelongTo.values())

                            // console.log("multiple clusters found...size is", clustersNeighborsBelongTo.size)
                        }

                    // temp: only add to points if known cluster ID
                    if (clusterIDToAddTo !== null)
                        {
                            // console.log("about to add point to cluster #", clusterIDToAddTo, "...")

                            // update cluster ID for current point
                            // also add current point to cluster
                            currentPoint.clusterID = clusterIDToAddTo;
                            knownClusters[clusterIDToAddTo].add(currentPointID);

                            // update all neighbors with known cluster ID
                            // also update cluster with each point
                            // for (let i = 0; i < neighbors.length; i++)
                            //     {
                            //         neighbors[i].clusterID = clusterIDToAddTo;
                            //         knownClusters[clusterIDToAddTo].add(neighbors[i].pointID);
                            //     }

                            for (let neighborID of neighbors)
                                {
                                    points[neighborID].clusterID = clusterIDToAddTo;
                                    knownClusters[clusterIDToAddTo].add(points[neighborID].pointID);
                                }

                            // console.log("first cluster now contains", knownClusters)
                        }

                    // if the current point has at least requiredPointsInRadius points, it is a core point
                    if (neighbors.size + 1 >= requiredPointsInRadius)
                        {
                            currentPoint.type = "core";

                            // any neighbors with an unknown status can now be updated to a boundary point
                            // for (let i = 0; i < neighbors.length; i++)
                            //     {
                            //         if (!neighbors[i].type || neighbors[i].type === "?")
                            //             {
                            //                 neighbors[i].type = "boundary";
                            //             }
                            //     }

                            for (let neighborID of neighbors)
                                {
                                    if (!points[neighborID].type || points[neighborID].type === "?")
                                        {
                                            points[neighborID].type = "boundary";
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

            // */

            // let circleForScale = [];

            // // create a ring of points surrounding the target point
            // for (let angle = 0; angle < 360; angle += 30)
            //     {
            //         circleForScale.push({
            //             x: currentPoint.x + epsilon * Math.cos(angle / 180 * Math.PI),
            //             y: currentPoint.y + epsilon * Math.sin(angle / 180 * Math.PI)
            //         })
            //     }

                
            // console.log("current point status:", currentPoint);
            // console.log("neighbors:", neighbors);
            // console.log("clusters:", knownClusters);
            // console.log("=========================================");
        }

    // turn sets back into arrays
    let outliersFormatted = Array.from(outliers);
    let clustersFormatted = knownClusters.map(cluster => Array.from(cluster).map(pointID => points[pointID]));

    // console.log("outliers:", outliersFormatted);
    // console.log("clusters:", clustersFormatted);

    // return [Array.from(outliers)];
    return [outliersFormatted, ...clustersFormatted];
    // return [neighbors, points, circleForScale];
}