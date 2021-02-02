import jsonData from "../mocks/alerts/alerts.json";
import {Agent} from '../interfaces/alert';

export class AgentService {

    public static async findAll(offset: string, limit: string) {
        try {
            console.log("Getting the Agents...");

            const agents: Agent[] = this.getAgents();
            const agentsRemove: Agent[] = this.removeDuplicates(agents);
            const agentsReduce: Agent[] = this.reduceCollection(agentsRemove, offset, limit);
            const agentsResult: Agent[] = this.findAndCountAlertByAgent(agentsReduce)

            const result = {
                tota_items: agentsReduce.length,
                data: agentsResult,
                paging: {
                    total_items: agentsRemove.length,
                    offset: offset,
                    limit: limit,
                    more_records: !(agentsResult.length < Number(limit))
                }
            }

            return result;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public static async findById(id: string) {
        try {
            const agents: Agent[] = this.getAgents()
            const agentsFitered: Agent[] = this.fiterById(agents, id);
            const agent: Agent = this.findAndCountAlertAndSetAlertByAgent(agentsFitered, id);
            return agent;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    private static getAgents() {
        const objCloneByJsonStringfy = JSON.parse(JSON.stringify(jsonData));
        return objCloneByJsonStringfy.map((alert: { _source: { agent: Agent; }; }) => alert._source.agent as Agent);
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

    private static fiterById(agents: Agent[], id: string): Agent[] {
        return agents.filter(f => f.id === id);
    }

    private static findAndCountAlertAndSetAlertByAgent(agents: Agent[], id: string): Agent {
        jsonData.map(alert =>
            agents.map(agent => {
                    if (alert._source.agent.id === id) {
                        if (agent.total_alerts) {

                            agent.total_alerts = agent.total_alerts + 1;
                            // @ts-ignore
                            agent.alerts.push(alert);
                            return agent;
                        } else {
                            agent.total_alerts = 1;
                            let alerts = new Array();
                            alerts.push(alert);
                            agent.alerts = alerts;
                            return agent;
                        }
                    } else {
                        return null;
                    }
                },
            ),
        );
        return agents[0];
    };

}
