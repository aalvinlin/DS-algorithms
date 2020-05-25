import { sortCoordinates } from "./sortCoordinates";

export const useDbscan = (points) => {

    sortCoordinates(points);

    return points;
}