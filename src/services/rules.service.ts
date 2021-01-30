import jsonData from "../mocks/alerts/alerts.json";
import {Agent, Rule} from "../interfaces/alert";

export class RulesService {
    public static async findAll(offset: string, limit: string) {
        try {
            console.log("Getting the Rules...");

            const rules: Rule[] = this.getRule();
            const rulesRemove: Rule[] = this.removeDuplicates(rules);
            const rulesReduce: Rule[] = this.reduceCollection(rulesRemove, offset, limit);
            const rulesResult: Rule[] = this.findAndCountAlertByAgent(rulesReduce)

            const result = {
                tota_items: rulesResult.length,
                data: rulesResult
            }

            return result;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public static async findById(id: string) {
        // try {
        //     const agents: Agent[] = this.getAgents()
        //     const agentsFitered: Agent[] = this.fiterById(agents, id);
        //     const agent: Agent = this.findAndCountAlertAndSetAlertByAgent(agentsFitered, id);
        //     return agent;
        // } catch (error) {
        //     console.log(error);
        //     throw error;
        // }

    }

    private static getRule() {
        const objCloneByJsonStringfy = JSON.parse(JSON.stringify(jsonData));
        return objCloneByJsonStringfy.map((rule: { _source: { rule: Rule; }; }) => rule._source.rule as Rule);
    }

    private static removeDuplicates(jsonData: Rule[]): Rule[] {
        return jsonData.filter((rule, index, self) =>
            index === self.findIndex(t => t.id === rule.id),
        );
    };

    private static reduceCollection(jsonData: Rule[], offset: string, limit: string) {
        return jsonData.slice(Number(offset), Number(limit) + Number(offset));
    };

    private static findAndCountAlertByAgent(rules: Rule[]): Rule[] {
        jsonData.map(alert =>
            rules.map(rule =>
                alert._source.rule.id === rule.id
                    ? (rule.total_alerts = rule.total_alerts
                    ? rule.total_alerts + 1
                    : 1)
                    : null,
            ),
        );
        return rules;
    };
}
