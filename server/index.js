const express = require('express');
const compression = require('compression');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

// SERVICE
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

const bodyParser = require('body-parser');

const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

mongoose.connect(config.DB_URI, { useNewUrlParser: true})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.error(err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true}))();

app.prepare()
.then(() => {
  const server = express();
  server.use(compression());
  server.use(bodyParser.json());

  server.use('/api/portfolios', portfolioRoutes);
  server.use('/api/blogs', blogRoutes);

  server.get('/robots.txt', (req, res) => {
    return res.status(200).sendFile('robots.txt', robotsOptions);
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
    }
  });

  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}, env = ${process.env.NODE_ENV}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
