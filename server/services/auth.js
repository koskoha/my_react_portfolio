const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

//MIDDLEWARE
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: 'https://goconstantine-react.auth0.com/.well-known/jwks.json'
  }),
  audience: '9DDmUkFvqF3le7hX0OYvez5mbPiAkgg1',
  issuer: 'https://goconstantine-react.auth0.com/',
  algorithms: ['RS256']
})

exports.checkRole = role => (
  (req, res, next) => {
    const user = req.user;

    if (user && (user[process.env.NAMESPACE + '/role'] === role)) {
      next();
    } else {
      return res.status(401).send({ title: "Not Authorize", description: "You are not authorized" })
    }
  }
)