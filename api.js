const express = require('express');
const request = require('request');
const port = process.env.PORT || 4000;
const app = express();
const moment = require('moment');
const cors = require('cors');
const rp = require('request-promise');

const date = moment().format('YYYYMMDD');
const router = express.Router();

let seasonYear;

app.use(cors());
app.use('/api', router);

router.get('/teams', (req, res) => {
  req
    .pipe(
      request(
        {
          url: `http://data.nba.net/prod/v2/2018/teams.json`,
          method: req.method,
        },
        (error, response, body) => {
          if (error) console.error('Oops, ERROR!', error);
        },
      ),
    )
    .pipe(res);
});

let options = {
  method: 'GET',
  uri: `http://data.nba.net/prod/v1/20190109/scoreboard.json`,
  json: true, // Automatically stringifies the body to JSON
};

router.get('/today', (req, res) => {
  rp(options)
    .then(games => {
      res.send(JSON.stringify(games));

      seasonYear = games.games[0].seasonYear;
    })
    .catch(err => {
      console.log('Oops, ERROR!', error);
    });
});

router.get('/players', (req, res) => {
  req
    .pipe(
      request(
        {
          url: `http://data.nba.net/prod/v1/${seasonYear}/players.json`,
          method: req.method,
        },
        error => {
          if (error) console.error('Oops, ERROR!', error);
        },
      ),
    )
    .pipe(res);
});

router.get('/boxscore/:gameId', (req, res) => {
  req
    .pipe(
      request(
        {
          url: `http://data.nba.net/prod/v1/20190109/${
            req.params.gameId
          }_boxscore.json`,
          method: req.method,
        },
        error => {
          if (error) console.error('Oops, ERROR!', error);
        },
      ),
    )
    .pipe(res);
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
