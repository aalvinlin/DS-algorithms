export const set1 = {
    clusters: [
        {
            type: "ellipse",
            numberOfPoints: 200,
            centerX: 60,
            centerY: 20,
            radiusX: 20,
            radiusY: 7,
            rotationAngleDegrees: 30,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 5
        },
        {
            type: "ellipse",
            numberOfPoints: 200,
            centerX: 80,
            centerY: 70,
            radiusX: 12,
            radiusY: 20,
            rotationAngleDegrees: 0,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        },
        {
            type: "circle",
            numberOfPoints: 100,
            centerX: 30,
            centerY: 90,
            radius: 10,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        },
        {
            type: "arc",
            numberOfPoints: 100,
            centerX: 20,
            centerY: 50,
            radiusOuter: 20,
            radiusInner: 15,
            angleDegrees: 30,
            direction: "less",
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        },
        {
            type: "arc",
            numberOfPoints: 100,
            centerX: 35,
            centerY: 50,
            radiusOuter: 20,
            radiusInner: 15,
            angleDegrees: 30,
            direction: "greater",
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        }
    ],
    noiseSettings: {
        numberOfPoints: 100,
        additionalX: 20,
        additionalY: 20,
        randomOffset: 0.1,
    }
}

export const set2 = {
    clusters: [
        {
            type: "circle",
            numberOfPoints: 100,
            centerX: 50,
            centerY: 80,
            radius: 20,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 5
        },
        {
            type: "circle",
            numberOfPoints: 100,
            centerX: 25,
            centerY: 20,
            radius: 15,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 5
        },
        {
            type: "circle",
            numberOfPoints: 100,
            centerX: 90,
            centerY: 30,
            radius: 15,
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 5
        }
    ],
    noiseSettings: {
        numberOfPoints: 100,
        additionalX: 20,
        additionalY: 20,
        randomOffset: 0.1,
    }
}

export const set3 = {
    clusters: [
        {
            type: "arc",
            numberOfPoints: 300,
            centerX: 60,
            centerY: 70,
            radiusOuter: 40,
            radiusInner: 30,
            angleDegrees: 120,
            direction: "less",
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        },
        {
            type: "arc",
            numberOfPoints: 300,
            centerX: 60,
            centerY: 40,
            radiusOuter: 40,
            radiusInner: 30,
            angleDegrees: 120,
            direction: "greater",
            randomOffset: 0.1,
            percentChanceOfAddingOutsidePoint: 10
        }
    ],
    noiseSettings: {
        numberOfPoints: 100,
        additionalX: 20,
        additionalY: 20,
        randomOffset: 0.1,
    }
}

// use with an epislon of 2 and a density of 3
export const simpleScatterPlot = [
    {x: 1, y: 1},
    {x: 2, y: 5},
    {x: 3, y: 6},
    {x: 3, y: 4},
    {x: 4, y: 4},
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 5, y: 7},
    {x: 6, y: 2},
    {x: 8, y: 6},
    {x: 10, y: 4},
]