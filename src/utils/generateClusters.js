export const generateClusterEllipse = (settings) => {

    let { numberOfPoints, centerX, centerY, radiusX, radiusY, rotationAngleDegrees = 0, randomOffset = 0, percentChanceOfAddingOutsidePoint = 10 } = settings;

    let pointsSoFar = 0;
    let points = [];

    let rotationAngleRadians = Math.tan(rotationAngleDegrees / 180 * Math.PI);

    // for rotated ellipses, bounding box will be the larger of the two axes
    let largerAxis = radiusX > radiusY ? radiusX : radiusY;

    while (pointsSoFar < numberOfPoints)
        {
            // determine offset from the origin of the ellipse
            let randomPointX = centerX + Math.floor(Math.random() * largerAxis) * oneOrNegativeOne();
            let randomPointY = centerY + Math.floor(Math.random() * largerAxis) * oneOrNegativeOne();

            // add point if it lies in the ellipse, or add the point anyway with an n% chance
            if (
                    ((randomPointX - centerX) * Math.cos(rotationAngleRadians) + ((randomPointY - centerY)) * Math.sin(rotationAngleRadians)) ** 2 / (radiusX ** 2)
                    + (-(randomPointX - centerX) * Math.sin(rotationAngleRadians) + ((randomPointY - centerY)) * Math.cos(rotationAngleRadians)) ** 2 / (radiusY ** 2)
                        <= 1
                    || (!Math.floor(Math.random() * 100 / percentChanceOfAddingOutsidePoint))
                    )
                {
                    // move point randomly by specified offset
                    randomPointX += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();
                    randomPointY += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();

                    points.push({x: randomPointX, y: randomPointY});
                    pointsSoFar += 1;
                }
        }


    // remove duplicate points. Will cause resulting array to contain fewer than numberOfPoints.
    points = points.filter((point, index) => points.indexOf(point) === index);

    return points;

}

export const generateClusterCircle = (settings) => {
    return generateClusterEllipse({...settings, radiusX: settings.radius, radiusY: settings.radius});
}

export const generateClusterArc = (settings) => {

    let { numberOfPoints, centerX, centerY, radiusOuter, radiusInner, angleDegrees = 0, direction = "greater", randomOffset = 0, percentChanceOfAddingOutsidePoint = 10 } = settings;

    // return nothing if the inner radius is too big
    if (radiusInner >= radiusOuter)
        { return []; }

    let pointsSoFar = 0;
    let points = [];
    let slope = null || angleDegrees;

    // determine equation of line to check
    if (slope) {

        if (angleDegrees % 180 === 90)
            { slope = "vertical" }
        
        else
            {
                // convert angle in degrees to a ratio
                slope = Math.tan(angleDegrees / 180 * Math.PI);
            }
    }

    while (pointsSoFar < numberOfPoints)
        {
            // determine offset from the origin of the circle
            let randomPointX = centerX + Math.floor(Math.random() * radiusOuter) * oneOrNegativeOne();
            let randomPointY = centerY + Math.floor(Math.random() * radiusOuter) * oneOrNegativeOne();

            // add point if it lies between the two circles
            // for now, do not allow adding points anyway with an n% chance (obscures arc shape)
            if (
                    ((randomPointX - centerX) ** 2 / (radiusOuter ** 2) + (randomPointY - centerY) ** 2 / (radiusOuter ** 2) <= 1
                        && (randomPointX - centerX) ** 2 / (radiusInner ** 2) + (randomPointY - centerY) ** 2 / (radiusInner ** 2) >= 1)

                    // if slope is specified, ensure that the point is either above/below the diagonal line specified or left/right of the vertical line
                    && (!slope
                        || (slope &&
                                (
                                    (slope !== "vertical" && direction === "greater" && randomPointY - centerY >= slope * (randomPointX - centerX))
                                    // (console.log(slope, direction) && slope !== "vertical" && direction === "less" && console.log("yay"))
                                    || (slope !== "vertical" && direction === "less" && randomPointY - centerY <= slope * (randomPointX - centerX))
                                    // vertical slope: keep x-values that are either greater than or less than h
                                    || (slope === "vertical" && direction === "less" && randomPointX <= centerX)
                                    || (slope === "vertical" && direction === "greater" && randomPointX >= centerX)
                                )
                            )
                        )
                    )
                {
                    // move point randomly by specified offset
                    randomPointX += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();
                    randomPointY += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();

                    points.push({x: randomPointX, y: randomPointY});
                    pointsSoFar += 1;
                }
        }


    // remove duplicate points. Will cause resulting array to contain fewer than numberOfPoints.
    return points.filter((point, index) => points.indexOf(point) === index);

}

export const generateNoise = (settings) => {

    let { numberOfPoints, minX, maxX, minY, maxY, randomOffset } = settings;

    let pointsSoFar = 0;
    let points = [];

    while (pointsSoFar < numberOfPoints)
        {
            let randomPointX = minX + Math.floor(Math.random() * (maxX - minX));
            let randomPointY = minY + Math.floor(Math.random() * (maxY - minY));

            // move point randomly by specified offset
            randomPointX += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();
            randomPointY += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();            
            
            // ensure that even after moving point by offset, the new coordinates are still within bounds
            if (randomPointX >= minX && randomPointX <= maxX && randomPointY >= minY && randomPointY <= maxY)
            {
                points.push({x: randomPointX, y: randomPointY});
                pointsSoFar += 1;
            }
        }

    return points;

}

// pick 1 or -1 with a 50% chance
const oneOrNegativeOne = () => {
    return Math.floor(Math.random() * 2) ? -1 : 1;
}