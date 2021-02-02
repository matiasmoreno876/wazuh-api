import jsonData from "../mocks/alerts/alerts.json";
import {Alert} from "../interfaces/alert";

export class AlertsService {

    static async findAll(offset: string, limit: string, ids: string) {

        try {
            console.log("Getting the Alerts...");
            const alerts: Alert[] = this.getAlerts();
            const idsArray: string[] = this.getIds(ids)
            const alertsFiltered: Alert[] = this.fiterByListId(alerts, idsArray);
            const alertsReduce: Alert[] = this.reduceCollection(alertsFiltered, offset, limit);

            const result = {
                tota_items: alertsReduce.length,
                data: alertsReduce,
                paging: {
                    total_items: alertsFiltered.length,
                    offset: offset,
                    limit: limit,
                    more_records: !(alertsReduce.length < Number(limit))
                }
            }

            return result
        } catch (error) {
            console.log(error)
            throw error;
        }

    }

    private static getAlerts() {
        const objCloneByJsonStringfy = JSON.parse(JSON.stringify(jsonData));
        return objCloneByJsonStringfy.map((alert: unknown) => (alert as unknown) as Alert);
    }

    private static reduceCollection(jsonData: Alert[], offset: string, limit: string) {
        return jsonData.slice(Number(offset), Number(limit) + Number(offset));
    };

    private static fiterByListId(alerts: Alert[], ids: string[]): Alert[] {
        if (ids.length !== 0) {
            const alertsFiltered = alerts.filter(t => ids.includes(t._id))
            return alertsFiltered;
        } else {
            return alerts;
        }
    }

    private static getIds(ids: string): string[] {
        if (!(ids === undefined)) {
            return ids.split(',');
        } else {
            return new Array();
        }
    }

}
