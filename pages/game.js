import React from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

const Game = props => {
  const {
    game: {
      basicGameData: { hTeam, vTeam, clock },
      // stats: {
      //   hTeam: { leaders: hLeaders } = {},
      //   vTeam: { leaders: vLeaders } = {},
      // } = {},
    },
  } = props;

  return (
    <ul>
      <li>
        {hTeam.triCode} (score: {hTeam.score}) vs {vTeam.triCode} (score:{' '}
        {vTeam.score})
      </li>
      <li>clock: {clock}</li>
    </ul>
  );
};

Game.getInitialProps = async function(context) {
  const { publicRuntimeConfig } = getConfig();
  const { id } = context.query;

  const url = `${publicRuntimeConfig.BASEURL}`;
  const res = await fetch(`${url}/api/boxscore/${id}`);
  const json = await res.json();

  return {
    game: json,
  };
};

Game.displayName = 'Game';

Game.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Game;
