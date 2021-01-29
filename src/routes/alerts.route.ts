import {Server} from "@hapi/hapi";

export const alertsRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/alerts',
        handler: () => {
        }
    })

}
