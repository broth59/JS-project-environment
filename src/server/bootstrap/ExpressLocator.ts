import { Container, ENVKEY, Profile } from '@config/env';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { buildSchema } from 'type-graphql';
import { createConnection, ConnectionOptions, EntityManager } from 'typeorm';
import { Repository } from 'typeorm';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import hpp from 'hpp';
import helmet from 'helmet';

import ResolverContext from '@server/graphql/type/ResolverContext';
import Entities from '@interface/entity';
import Resolvers from '@server/graphql/resolver';
import * as Routes from '@server/router';

const HOST = Container.getValue(ENVKEY.SERVER.HOST);
const DB_CONFIG = Container.getValue(ENVKEY.SERVER.DB_CONFIG);

/* DEVELOPMENT */
Container.environment(Profile.DEVELOPMENT);
Container.bindName(ENVKEY.SERVER.EXPRESS.APP).to(async () => {
    const app = express();
    // app.use(hpp())
    // app.use(helmet())
    // app.use(morgan("combined"));
    // app.use(cors({
    // 	origin: new RegExp(HOST),
    // 	credentials: true,
    // }))

    const db_connection = await createConnection({
        ...DB_CONFIG,
        entities: Entities,
    } as ConnectionOptions);

    connectRouter(app, db_connection.manager);
    const apollo_server = await createAndApplyApolloServer(
        app,
        db_connection.manager
    );

    return [app, apollo_server];
});

/* PRODUNCTION */
Container.environment(Profile.PRODUCTION);
Container.bindName(ENVKEY.SERVER.EXPRESS.APP).to(async () => {
    const app = express();

    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(
        cors({
            origin: new RegExp(HOST),
            credentials: true,
        })
    );

    return app;
});

function connectRouter(app: Express, db_manager: EntityManager) {
    new Routes.UserRouter(app, db_manager);
}

async function createAndApplyApolloServer(
    app: Express,
    db_manager: EntityManager
) {
    const schema = await buildSchema({
        resolvers: Resolvers,
        nullableByDefault: true,
    } as any);
    const apollo_server = new ApolloServer({
        schema,
        context: ({ req, res }: any) => {
            const repository_cache = {} as { [index: string]: Repository<any> };

            return {
                req,
                res,
                db: {
                    manager: db_manager,
                    getRepository(entity: any): Repository<any> {
                        if (!repository_cache[entity]) {
                            repository_cache[entity] = db_manager.getRepository(
                                entity
                            );
                        }
                        return repository_cache[entity];
                    },
                },
            } as ResolverContext;
        },
    });

    apollo_server.applyMiddleware({ app });

    return apollo_server;
}
