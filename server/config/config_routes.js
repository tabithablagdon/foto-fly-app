import path from 'path';

export default app => {

  // Servers assets to Client
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../client/www/index.html')));

  // Servers assets to Client
  app.route('/*').get((req, res) => res.sendFile(path.join(__dirname, '../../', req.url)));

}
