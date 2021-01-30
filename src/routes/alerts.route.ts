import {Server} from "@hapi/hapi";
import {AlertsController} from "../controllers/alerts.controller"

export const alertsRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/alerts',
        handler: AlertsController.findAll
    })

}
