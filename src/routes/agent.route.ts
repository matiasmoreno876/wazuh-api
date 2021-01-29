import {Server} from "@hapi/hapi";
import {AgentController} from "../controllers/agent.controller"

export const agentRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/agents',
        handler: AgentController.findAll
    })

    server.route({
        method: 'GET',
        path: '/agents/{id}',
        handler: () => {
        }
    })


}
