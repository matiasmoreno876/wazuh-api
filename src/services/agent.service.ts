import * as jsonData from "../mocks/alerts/alerts.json";

export class AgentService {

    static async findAll() {
        console.log("en service refactor2");
        return jsonData[0]
    }

    static async getAgents() {
    }

}
