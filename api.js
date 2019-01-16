const express = require('express');
const request = require('request');
const port = process.env.PORT || 4000;
const app = express();
const moment = require('moment-timezone');
const cors = require('cors');
const rp = require('request-promise');

const date =
  process.env.NODE_ENV === 'dummy'
    ? '20181203'
    : moment.tz('America/New_York').format('YYYYMMDD');

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
        error => {
          if (error) console.error('Oops, ERROR!', error);
        },
      ),
    )
    .pipe(res);
});

router.get('/today', (req, res) => {
  let options = {
    method: 'GET',
    uri: `http://data.nba.net/prod/v1/${date}/scoreboard.json`,
    json: true, // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(games => {
      res.send(JSON.stringify(games));
      seasonYear = games.games[0].seasonYear;
    })
    .catch(error => {
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
  let options = {
    uri: `http://data.nba.net/prod/v1/${date}/${
      req.params.gameId
    }_boxscore.json`,
    method: 'GET',
    json: true, // Automatically stringifies the body to JSON
  };
  rp(options)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log('Oops, ERROR!', error);
    });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
