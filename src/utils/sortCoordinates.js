// sort by increasing x-coordinates
// if x-coordinates are the same, sort by increasing y-coordinates
export const sortCoordinates = (coordinates) => {

    coordinates.sort((a, b) => {

        if (a.x < b.x)
            { return -1; }
        else if (a.x > b.x)
            { return 1; }

        // x-coordinates are the same; sort by y-coordinates
        else
            {
                if (a.y < b.y)
                    { return -1; }
                else
                    { return 1; }
            }
    })

}