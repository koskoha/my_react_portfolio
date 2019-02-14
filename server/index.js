const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

//SERVICES
const authServices = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const config = require('./config');
const bodyParser = require('body-parser');

secretData = [
  {
    title: 'Secret title',
    description: 'Secret title'
  },
  {
    title: 'Secret Title 2',
    description: 'Secret title 2'
  }
]

const portfolioRouter = require('./routes/portfolioRoutes')

mongoose
  .connect( config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err))

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    server.use('/api/portfolios', portfolioRouter);

    // Auth testing
    server.get('/api/secret', authServices.checkJWT, (req, res) => {
      return res.json(secretData)
    })

    server.get('/api/siteowner', authServices.checkJWT, authServices.checkRole('siteOwner'), (req, res) => {
      return res.json(secretData)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ title: "Unauthorized", detail: "Unauthorized access" });
      }
    });

    server.use(handle).listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })