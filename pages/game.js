import React from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

import Slider from '../components/Slider';

const Game = props => {
  const {
    game: {
      basicGameData: { hTeam, vTeam, clock },
      // stats: {
      // hTeam: { leaders: hLeaders } = {},
      // vTeam: { leaders: vLeaders } = {},
      // } = {},
    },
  } = props;

  return (
    <>
      <ul>
        <li>
          {/* {hLeaders.points.players.map(p => p.personId)} */}
          {hTeam.triCode} (score: {hTeam.score}) vs {vTeam.triCode} (score:{' '}
          {vTeam.score})
        </li>
        <li>clock: {clock}</li>
      </ul>
      <Slider />
    </>
  );
};

Game.getInitialProps = async context => {
  const { publicRuntimeConfig } = getConfig();
  const { id } = context.query;

  const url = `${publicRuntimeConfig.BASEURL}`;

  /* eslint-disable no-unused-vars */
  const [game, players] = await Promise.all([
    fetch(`${url}/api/boxscore/${id}`),
    fetch(`${url}/api/players`),
  ]);
  /* eslint-disable no-unused-vars */
  const g = await game.json();
  const p = await players.json();

  return {
    game: g,
    players: p,
  };
};

Game.displayName = 'Game';

Game.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Game;
