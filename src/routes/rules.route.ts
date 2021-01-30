import {Server} from "@hapi/hapi";
import {RulesController} from "../controllers/rules.controller";

export const rulesRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/rules',
        handler: RulesController.findAll
    })

    server.route({
        method: 'GET',
        path: '/rules/{id}',
        handler: RulesController.findById
    })


}
