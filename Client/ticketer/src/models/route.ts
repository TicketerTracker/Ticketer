import { Leg } from "./leg";

export class Route {
    constructor(_price: number) {
        this.price = _price;
        this.legs = new Array();
    }

    public legs: Array<Leg>;
    public price: number;
}