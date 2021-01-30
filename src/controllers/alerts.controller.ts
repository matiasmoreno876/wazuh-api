import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {AlertsService} from "../services/alerts.service";

export class AlertsController {

    static async findAll(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        try {
            console.log(`FindAll Alerts: offset: ${req.query.offset}, limit: ${req.query.limit}, ids: ${req.query.id} `);

            const json = await AlertsService.findAll(req.query.offset, req.query.limit, req.query.id);

            return res.response(json).code(200);
        } catch (error) {
            return res.response(error).code(500)
        }
    }

}

