import {Server} from '@hapi/hapi'
import {agentRoutes} from "./routes/agent.route";
import {alertsRoutes} from "./routes/alerts.route";
import {rulesRoutes} from "./routes/rules.route";

export const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    agentRoutes(server);
    alertsRoutes(server);
    rulesRoutes(server);

    await server.start();
    console.log('Server runing on %s', server.info.uri);
}
