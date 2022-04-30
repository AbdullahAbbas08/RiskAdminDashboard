import { Time } from "@angular/common";



export class GraphData {
    clientTypeCount: number
    clientCount: number
    employeeCount: number
    callCount:number
    callInCount: number
    callOutCount: number
    graphDataTime:graphDataTime[]
}

export class graphDataTime {

    hour: Time
    number_Hour: number
    count: number
}

