/* eslint-disable @typescript-eslint/no-unused-vars */
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import swaggerAuth from './middlewares/swaggerAuth';
import cron from 'node-cron';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { reAuditGenerator } from './utils/functions/reAuditGenerator';
import timeout from 'connect-timeout';
import { NODE_ENV, PORT } from './config';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.use(timeout(1800000));
    this.app.options('*', cors());
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3030;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.auditScheduling();
    this.getLatestAuditsScheduling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`Server is listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
  }

  public corsEnable() {
    this.app.use(cors());
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url, dbConnection.options).then(
      () => console.log('database connected'),
      err => console.log('database connection error', err),
    );
  }
  private initializeMiddlewares() {
    this.app.use(timeout(1800000));
    this.app.use(morgan('combined', { stream }));
    this.app.use(this.haltOnTimedout);
    this.app.use(cors({ origin: '*', credentials: true }));
    this.app.use(this.haltOnTimedout);
    this.app.use(helmet());
    this.app.use(this.haltOnTimedout);
    this.app.use(compression());
    this.app.use(this.haltOnTimedout);
    this.app.use(express.json());
    this.app.use(this.haltOnTimedout);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.haltOnTimedout);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'API Documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/docs/:apiKey', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
