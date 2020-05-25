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

export const generateClusterArc = (numberOfPoints, h, k, rOuter, rInner, angle, direction, randomOffset=0) => {
    
    if (rInner >= rOuter)
        { return []; }

    let pointsSoFar = 0;
    let points = [];

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

                    // || (!Math.floor(Math.random() * chanceOfAddingOutsidePoint))
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

// pick 1 or -1 with a 50% chance
const oneOrNegativeOne = () => {
    return Math.floor(Math.random() * 2) ? -1 : 1;
}