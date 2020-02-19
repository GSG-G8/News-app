const path = require('path');

const clientErr = (req, res) => {
  res.status(404)
  // .sendFile()
};

const serverErr = (err, req, res, next) => {
  res.status(500)
  // .sendFile()
};

module.exports = {
  clientErr,
  serverErr
}