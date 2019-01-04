import React, { Component } from 'react';
// import Button from '../components/Button';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import TeamPicker from '../components/TeamPicker';
import { withRouter } from 'next/router';

class Teams extends Component {
  static async getInitialProps() {
    const { publicRuntimeConfig } = getConfig();
    const url = `${publicRuntimeConfig.BASEURL}`;
    const result = await fetch(`${url}/api/teams`);
    const json = await result.json();
    return {
      teams: json,
    };
  }

  setFavoriteTeam = team => {
    localStorage.setItem('favTeam', team);
    this.props.router.push('/');
  };

  render() {
    const {
      teams: {
        league: { standard },
      },
    } = this.props;

    const Nba = standardTeams =>
      standardTeams.filter(team => team.isNBAFranchise === true);

    return (
      <TeamPicker
        handleChange={e => this.setFavoriteTeam(e.target.value)}
        teams={Nba(standard)}
      />
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Teams);
