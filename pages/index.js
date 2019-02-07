import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';

import teamNames from '../lib/teamNames';
import Text from '../components/Text';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
    };
  }

  render() {
    const { games, loading } = this.props;

    return (
      <Fragment>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          games.map(game => (
            <div key={game.gameId}>
              <Text fontSize={3} mb={3} as={'label'} htmlFor={'team-picker'}>
                <Link href={{ pathname: `/game/${game.gameId}` }}>
                  <a>
                    {`the ${teamNames[game.hTeam.triCode]} take on the ${
                      teamNames[game.vTeam.triCode]
                    } @ ${game.arena.name}. Game
            starts at ${game.startTimeEastern}`}
                  </a>
                </Link>
              </Text>
            </div>
          ))
        )}
      </Fragment>
    );
  }
}

Index.propTypes = {
  favTeam: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  games: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(Index);
