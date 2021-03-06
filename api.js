const express = require('express');
const request = require('request');
const port = process.env.PORT || 4000;
const app = express();
const cors = require('cors');

const moment = require('moment-timezone');
const rp = require('request-promise');
const errorHandlers = require('./handlers/errorHandlers');

const date =
  process.env.NODE_ENV === 'dummy'
    ? '20181203'
    : moment.tz('America/New_York').format('YYYYMMDD');

const router = express.Router();

app.use(cors());
app.use('/api', router);
app.use(errorHandlers.notFound);

fetchSeasonYear = () =>
  rp({
    method: 'GET',
    uri: `http://data.nba.net/10s/prod/v1/today.json`,
    json: true,
  });

if (!global.seasonYear) {
  fetchSeasonYear().then(res => {
    global.seasonYear = res.seasonScheduleYear;
  });
}

router.get('/teams', (req, res) => {
  let options = {
    method: 'GET',
    uri: `http://data.nba.net/prod/v2/${global.seasonYear}/teams.json`,
    json: true,
  };
  rp(options)
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .catch(error => {
      console.log('Oops, ERROR!', error);
    });
});

router.get('/today', (req, res) => {
  let options = {
    method: 'GET',
    uri: `http://data.nba.net/prod/v1/${date}/scoreboard.json`,
    json: true,
  };

  rp(options)
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .catch(error => {
      console.log('Oops, ERROR!', error);
    });
});
router.get('/players', (req, res) => {
  let options = {
    method: 'GET',
    uri: `http://data.nba.net/prod/v1/${global.seasonYear}/players.json`,
    json: true,
  };

  rp(options)
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .catch(error => {
      console.log('Oops, ERROR!', error);
    });
});
router.get('/boxscore/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  let options = {
    uri: `http://data.nba.net/10s/prod/v1/${date}/${gameId}_boxscore.json`,
    method: 'GET',
    json: true,
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
