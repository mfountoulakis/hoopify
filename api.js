const express = require('express');
const request = require('request');
const port = process.env.PORT || 4000;
const app = express();
const moment = require('moment');
const cors = require('cors');

const date = moment().format('YYYYMMDD');
const router = express.Router();

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

router.get('/today', (req, res) => {
  req
    .pipe(
      request(
        {
          url: `http://data.nba.net/prod/v1/${date}/scoreboard.json`,
          method: req.method,
        },
        (error, response, body) => {
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
          url: `http://data.nba.net/prod/v1/${date}/${
            req.params.gameId
          }_boxscore.json`,
          method: req.method,
        },
        (error, response, body) => {
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
