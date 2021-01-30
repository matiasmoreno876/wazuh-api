import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {RulesService} from "../services/rules.service";

export class RulesController {

    static async findAll(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        try {
            console.log(`FindAll Rules: offset: ${req.query.offset}, limit: ${req.query.limit} `);
            const json = await RulesService.findAll(req.query.offset, req.query.limit);
            return res.response(json).code(200);
        } catch (error) {
            return res.response(error).code(500)
        }
    }

    static async findById(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        try {
            console.log(`Find Rules by id: ${req.params.id}`);
            const json = await RulesService.findById(req.params.id);

            return res.response(json).code(200);
        } catch (error) {
            return res.response(error).code(500)
        }
    }

}

