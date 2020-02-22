require('dotenv').config();
const fetch = require('node-fetch');

module.exports = (req, res) => {
  fetch(`http://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${process.env.key}`)
    .then((result) => result.json())
    .then((result) => res.json(result));
};
