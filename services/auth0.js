import auth0 from 'auth0-js';
import cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { getCookieFromReq } from '../helpers/utils';

class Auth {

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'goconstantine-react.auth0.com',
      clientID: '9DDmUkFvqF3le7hX0OYvez5mbPiAkgg1',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject();
          console.log(err);
        }
      });
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    // this.accessToken = authResult.accessToken;

    cookies.set('user', authResult.idTokenPayload);
    cookies.set('jwt', authResult.idToken);
    cookies.set('expiresAt', expiresAt);
  }

  logout() {
    cookies.remove('expiresAt');
    cookies.remove('jwt');
    cookies.remove('user');

    this.auth0.logout({
      returnTo: '',
      clientID: '9DDmUkFvqF3le7hX0OYvez5mbPiAkgg1'
    })
  }

  login() {
    this.auth0.authorize();
  }

  async getJWKS() {
    const res = await axios.get('https://goconstantine-react.auth0.com/.well-known/jwks.json');
    const jwks = res.data;
    return jwks;
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) { return undefined }
      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];
      //build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
      // 

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;
          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }
    return undefined;
  }

  async clientAuth() {
    const token = cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, 'jwt');
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }
    return undefined;
  }

}

const auth0Client = new Auth();

export default auth0Client;
