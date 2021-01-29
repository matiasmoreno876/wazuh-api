import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {findAll as serviceFindAll} from "../services/agent.service";

export const findAll = async (req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
    try {
        console.log(req.payload);
        const json: any = await serviceFindAll();

        return res.response(json).code(200);
    } catch (error) {
        return res.response(error).code(500)
    }
}
