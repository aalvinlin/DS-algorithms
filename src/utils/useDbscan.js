import { sortCoordinates } from "./sortCoordinates";

export const useDbscan = (points, epsilon, requiredPointsInRadius) => {

    sortCoordinates(points);

    // add index to each point
    points = points.map((point, index) => { return {...point, index}});

    let currentPoint = points[0];

    let neighbors = [];
    let othersInXRange = [];

    for (let i = currentPoint.index; Math.abs(currentPoint.x - points[i].x) <= epsilon; i++)
        {
            if (Math.abs(currentPoint.y - points[i].y) <= epsilon)
                {
                    // potential neighbor found
                    console.log("neighbor found!")
                    neighbors.push(points[i]);
                }
            else
                {
                    othersInXRange.push(points[i]);
                }
        }

    console.log(currentPoint, neighbors);

    return [neighbors, othersInXRange];
}