const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.secretOrPublicKey = secretOrPublicKey;
  this.options = options;
}

const tokenGenerator = new TokenGenerator(
  process.env.SECRET_KEY,
  process.env.SECRET_KEY,
  {
    algorithm: "HS256",
    noTimestamp: false,
    expiresIn: "30m",
  }
);

TokenGenerator.prototype.sign = function (payload, signOptions) {
  const jwtSignOptions = Object.assign({}, signOptions, this.options);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

TokenGenerator.prototype.verify = function (token, refreshOptions) {
  console.log("verifying token");
  try {
    const payload = jwt.verify(
      token,
      this.secretOrPublicKey,
      refreshOptions.verify
    );
    return payload;
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }
};

TokenGenerator.prototype.refresh = function (token, refreshOptions) {
  const payload = tokenGenerator.verify(token, refreshOptions);
  delete payload.iat;
  delete payload.exp;
  const jwtSignOptions = Object.assign({}, this.options);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};
module.exports = {
  authenticate: (req, res, next) => {
    try {
      tokenGenerator.verify(req.headers.authorization.slice(7), {
        verify: { issuer: "MERN Auth API" },
      });

      next();
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  },

  GetUserIdFromJWT: async (token) => {
    let decoded = jwt.decode(token);
    decoded = decoded.sub.split("|").pop();
    return decoded;
  },
  refresh: (req, res) => {
    console.log("refreshing token");
    const token = tokenGenerator.refresh(req.headers.authorization.slice(7), {
      verify: { issuer: "MERN Auth API" },
    });
    return token;
  },
  sign: async (req) => {
    console.log("issuing new token");
    const token = tokenGenerator.sign(
      {},
      { issuer: "MERN Auth API", subject: `userId|${req.userId}` }
    );
    return token;
  },
};
