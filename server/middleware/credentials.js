const allowedOrigions = require("../config/allowedOrigions");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigions.includes(origin)) {
    res.headers("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
