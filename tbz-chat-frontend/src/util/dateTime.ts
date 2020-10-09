import { Moment } from "moment";

export const momentCompare = (a?: Moment, b?: Moment) => {
    if(a === undefined) {
        if(b !== undefined) return -1
        else return 0
    }

    if(b === undefined) {
        if(a !== undefined) return 1
        else return 0
    }

    if(a < b) return -1
    else if (a > b) return 1
    else return 0
}