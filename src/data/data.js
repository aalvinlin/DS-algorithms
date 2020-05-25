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