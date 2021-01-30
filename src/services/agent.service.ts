import jsonData from "../mocks/alerts/alerts.json";
import {Agent, Alert} from '../interfaces/alert';

export class AgentService {

    public static async findAll(offset: string, limit: string) {
        try {
            console.log("Getting the Agents...");

            let agents: Agent[];
            agents = this.getAgents();
            let agentsRemove: Agent[] = this.removeDuplicates(agents);
            let agentsReduce: Agent[] = this.reduceCollection(agentsRemove, offset, limit);
            let agentsResult: Agent[] = this.findAndCountAlertByAgent(agentsReduce)

            const result = {
                tota_items: agentsReduce.length,
                data: agentsResult
            }

            return result;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private static getAgents() {
        return jsonData.map(alert => alert._source.agent as Agent);
    }

    private static removeDuplicates(jsonData: Agent[]): Agent[] {
        return jsonData.filter((agent, index, self) =>
            index === self.findIndex(t => t.id === agent.id),
        );
    };

    private static reduceCollection(jsonData: Agent[], offset: string, limit: string) {
        return jsonData.slice(Number(offset), Number(limit) + Number(offset));
    };

    private static findAndCountAlertByAgent(agents: Agent[]): Agent[] {
        jsonData.map(alert =>
            agents.map(agent =>
                alert._source.agent.id === agent.id
                    ? (agent.total_alerts = agent.total_alerts
                    ? agent.total_alerts + 1
                    : 1)
                    : null,
            ),
        );
        return agents;
    };

}
