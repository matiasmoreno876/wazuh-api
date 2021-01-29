import * as data from "../mocks/alerts/alerts.json";

export class RulesService {
    static async findAll() {
        console.log("en service refactor 3");
        return data[0]
    }
}
