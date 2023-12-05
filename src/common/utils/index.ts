import * as process from 'process';

export const env = () =>
    ({ prod: 'prod', production: 'prod', dev: 'dev', test: 'test' }[
        process.env.NODE_ENV
        ] ?? 'local');

export const isProd =  env() === 'prod'



