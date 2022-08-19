import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import { auth0Config } from "../config/auth0.config";

export const jwtCheck = jwt.expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.auth0Domain}/.well-known/jwks.json`,
  }),
  audience: auth0Config.auth0Audience,
  issuer: `https://${auth0Config.auth0Domain}/`,
  algorithms: ["RS256"],
});
