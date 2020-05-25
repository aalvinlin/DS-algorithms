export const generateClusterEllipse = (numberOfPoints, h, k, a, b, rotationAngle=0, randomOffset=0) => {

    let pointsSoFar = 0;
    let points = [];

    // 1/n chance of adding a point outside the shape
    let chanceOfAddingOutsidePoint = 3;

    while (pointsSoFar < numberOfPoints)
        {
            // determine offset from the origin of the ellipse
            let randomPointX = h + Math.floor(Math.random() * a) * oneOrNegativeOne();
            let randomPointY = k + Math.floor(Math.random() * b) * oneOrNegativeOne();

            // add point if it lies in the ellipse, or add the point anyway with a 1/n chance
            if (
                    (randomPointX - h) ** 2 / (a ** 2) + (randomPointY - k) ** 2 / (b ** 2) <= 1
                    || (!Math.floor(Math.random() * chanceOfAddingOutsidePoint))
                    )
                {
                    // move point randomly by specified offset
                    randomPointX += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();
                    randomPointY += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();

                    points.push([randomPointX, randomPointY]);
                    pointsSoFar += 1;
                }
        }


    // remove duplicate points. Will cause resulting array to contain fewer than numberOfPoints.
    return points.filter((point, index) => points.indexOf(point) === index);

}

export const generateClusterCircle = (numberOfPoints, h, k, r, randomOffset=0) => {
    return generateClusterEllipse(numberOfPoints, h, k, r, r, 0, randomOffset);
}

export const generateClusterArc = (numberOfPoints, h, k, rOuter, rInner, angle=0, direction="greater", randomOffset=0) => {

    // return nothing if the inner radius is too big
    if (rInner >= rOuter)
        { return []; }

    let pointsSoFar = 0;
    let points = [];
    let slope = null || angle;

    // determine equation of line to check
    if (slope) {

        if (angle % 180 === 90)
            { slope = "vertical" }
        
        else
            {
                // convert angle in degrees to a ratio
                slope = Math.tan(angle / 180 * Math.PI);
            }

        console.log("slope is", slope)
    }

    // 1/n chance of adding a point outside the shape
    let chanceOfAddingOutsidePoint = 50;

    while (pointsSoFar < numberOfPoints)
        {
            // determine offset from the origin of the circle
            let randomPointX = h + Math.floor(Math.random() * rOuter) * oneOrNegativeOne();
            let randomPointY = k + Math.floor(Math.random() * rOuter) * oneOrNegativeOne();

            // add point if it lies between the two circles, or add the point anyway with a 1/n chance
            if (
                    ((randomPointX - h) ** 2 / (rOuter ** 2) + (randomPointY - k) ** 2 / (rOuter ** 2) <= 1
                        && (randomPointX - h) ** 2 / (rInner ** 2) + (randomPointY - k) ** 2 / (rInner ** 2) >= 1)


                    // if slope is specified, ensure that the point is either above/below the diagonal line specified or left/right of the vertical line
                    && (!slope
                        || (slope &&
                                (
                                    (slope !== "vertical" && direction === "greater" && randomPointY - k >= slope * (randomPointX - h))
                                    // (console.log(slope, direction) && slope !== "vertical" && direction === "less" && console.log("yay"))
                                    || (slope !== "vertical" && direction === "less" && randomPointY - k <= slope * (randomPointX - h))
                                    // vertical slope: keep x-values that are either greater than or less than h
                                    || (slope === "vertical" && direction === "less" && randomPointX <= h)
                                    || (slope === "vertical" && direction === "greater" && randomPointX >= h)
                                )
                            )
                        )
                    )
                {
                    console.log(randomPointY - k <= slope * (randomPointX - h))

                    // move point randomly by specified offset
                    randomPointX += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();
                    randomPointY += Math.floor(Math.floor(1 / randomOffset / 2) * Math.random()) * randomOffset * oneOrNegativeOne();

                    points.push([randomPointX, randomPointY]);
                    pointsSoFar += 1;
                }
        }


    // remove duplicate points. Will cause resulting array to contain fewer than numberOfPoints.
    return points.filter((point, index) => points.indexOf(point) === index);

}

// pick 1 or -1 with a 50% chance
const oneOrNegativeOne = () => {
    return Math.floor(Math.random() * 2) ? -1 : 1;
}