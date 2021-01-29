import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {AgentService} from "../services/agent.service";

export class AgentController {

    static async findAll(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        try {
            console.log(req.payload);
            console.log("refactor controller 2");
            const json: any = await AgentService.findAll();

            return res.response(json).code(200);
        } catch (error) {
            return res.response(error).code(500)
        }
    }

}

