import express from 'express';
import configServer from './config/config_server';
import configRoutes from './config/config_routes';
import dotEnv from 'dotenv';

// Create express app
const app = express();

// Configurations
configServer(app);
configRoutes(app);
dotEnv.config();
const WORKERS = process.env.WEB_CONCURRENCY || 1;

// Start server
const server = app.listen(process.env.PORT || 5200, () => {

  const port = server.address().port;

  console.log(`FotoFly app is listening on port ${port}`);

});
