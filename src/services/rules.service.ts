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
                data: rulesResult,
                paging: {
                    total_items: rulesRemove.length,
                    offset: offset,
                    limit: limit,
                    more_records: !(rulesResult.length < Number(limit))
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
            const rules: Rule[] = this.getRule()
            const rulesFitered: Rule[] = this.fiterById(rules, id);
            const rule: Rule = this.findAndCountAlertAndSetAlertByAgent(rulesFitered, id);
            return rule;
        } catch (error) {
            console.log(error);
            throw error;
        }
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

    private static fiterById(rules: Rule[], id: string): Rule[] {
        return rules.filter(f => f.id === id);
    }

    private static findAndCountAlertAndSetAlertByAgent(rules: Rule[], id: string): Rule {
        jsonData.map(alert =>
            rules.map(rule => {
                    if (alert._source.rule.id === id) {
                        if (rule.total_alerts) {

                            rule.total_alerts = rule.total_alerts + 1;
                            // @ts-ignore
                            rule.alerts.push(alert);
                            return rule;
                        } else {
                            rule.total_alerts = 1;
                            let alerts = new Array();
                            alerts.push(alert);
                            rule.alerts = alerts;
                            return rule;
                        }
                    } else {
                        return null;
                    }
                },
            ),
        );
        return rules[0];
    };

}
