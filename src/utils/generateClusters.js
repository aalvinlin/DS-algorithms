export const generateClusterEllipse = (numberOfPoints, h, k, a, b, rotationAngle, randomOffset) => {

    let pointsSoFar = 0;
    let points = [];

    while (pointsSoFar < numberOfPoints)
        {
            // determine offset from the origin of the ellipse
            let randomPointX = h + Math.floor(Math.random() * a) * oneOrNegativeOne() + randomOffset * oneOrNegativeOne();
            let randomPointY = h + Math.floor(Math.random() * b) * oneOrNegativeOne() + randomOffset * oneOrNegativeOne();

            points.push([randomPointX, randomPointY]);
            pointSoFar += 1;
        }


    // remove duplicate points. Will cause resulting array to contain fewer than numberOfPoints.
    return points.filter((point, index) => indexOf[point] === index);

}

export const generateClusterCircle = (numberOfPoints, h, k, r, randomOffset) => {
    return generateClusterEllipse(numberOfPoints, h, k, r, r, 0, randomOffset);
}

// pick 1 or -1 with a 50% chance
const oneOrNegativeOne = () => {
    return Math.floor(Math.random() * 2) ? -1 : 1;
}