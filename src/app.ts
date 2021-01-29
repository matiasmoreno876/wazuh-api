import {Server} from '@hapi/hapi'

export const init = async () => {
    const server = new Server({
        port: 3000,
        host: 'localhost'
    });
    await server.start();
    console.log('Server runing on %s', server.info.uri);
}
