import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { withRouter } from 'next/router';

import { ViewLayout } from '../components/Layout';
import ActionButton from '../components/ActionButton';
import Text from '../components/Text';
import Select from '../components/Select';

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
  };

  handleChange = event => this.setFavoriteTeam(event.target.value);

  render() {
    const {
      router,
      teams: {
        league: { standard },
      },
    } = this.props;

    const Nba = standardTeams =>
      standardTeams.filter(team => team.isNBAFranchise === true);

    const standardTeams = Nba(standard);

    return (
      <ViewLayout
        bottom={
          <ActionButton onClick={() => router.push('/')}>GO</ActionButton>
        }
      >
        <Text fontSize={3} mb={4} as={'label'} htmlFor={'team-picker'}>
          Choose your favorite NBA team to start:
        </Text>
        <Select htmlName={'team-picker'} onChange={e => this.handleChange(e)}>
          {standardTeams.map(team => (
            <option value={team.tricode} key={team.teamId}>
              {team.fullName}
            </option>
          ))}
        </Select>
        <Text color={'gray'}>
          Free agent fan? Don’t stress it, you can choose a different team later
          in the settings.
        </Text>
      </ViewLayout>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Teams);
