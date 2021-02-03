import { DepartureOrArrival } from './departureOrArrival';
import { RailwayStation } from './railwayStation';
export class Leg{
    origin: RailwayStation;
    destination: RailwayStation;
    departure: DepartureOrArrival;
    arrival: DepartureOrArrival;
}