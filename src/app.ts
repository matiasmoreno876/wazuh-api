import {Server} from '@hapi/hapi'
import {agentRoutes} from "./routes/agent.route";
import {alertsRoutes} from "./routes/alerts.route";
import {rulesRoutes} from "./routes/rules.route";
require('dotenv').config({path: 'variables.env'})

export const init = async () => {
    const server: Server = new Server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || 'localhost',
        routes: { cors: true }
    });

    agentRoutes(server);
    alertsRoutes(server);
    rulesRoutes(server);

    await server.start();
    console.log('Server runing on %s', server.info.uri);
}
