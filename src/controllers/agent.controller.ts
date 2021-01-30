import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {AgentService} from "../services/agent.service";

export class AgentController {

    static async findAll(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        try {
            console.log(`FindAll Agents: offset: ${req.query.offset}, limit: ${req.query.limit} `);
            const json = await AgentService.findAll(req.query.offset, req.query.limit);

            return res.response(json).code(200);
        } catch (error) {
            return res.response(error).code(500)
        }
    }

}

