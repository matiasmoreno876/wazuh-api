import {Server} from "@hapi/hapi";

export const rulesRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/rules',
        handler: () => {
        }
    })

    server.route({
        method: 'GET',
        path: '/rules/{id}',
        handler: () => {
        }
    })


}
