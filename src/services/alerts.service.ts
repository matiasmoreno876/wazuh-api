import * as jsonData from "../mocks/alerts/alerts.json";

export class AlertsService {

    static async findAll() {
        console.log("en service refactor");
        return jsonData[0]
    }

}
