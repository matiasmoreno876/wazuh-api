import {Server} from "@hapi/hapi";
import {findAll} from "../controllers/agent.controller"

export const agentRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/agents',
        handler: findAll
    })

    server.route({
        method: 'GET',
        path: '/agents/{id}',
        handler: () => {
        }
    })


}
