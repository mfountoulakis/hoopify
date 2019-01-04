import React from 'react';
import { Flex } from '@rebass/grid';
import PropTypes from 'prop-types';
import Text from '../Text';

const TeamPicker = ({ teams, handleChange }) => (
  <Flex justifyContent={'center'}>
    <label>
      <Text>Please Select Your Favorite Team</Text>
      <select onChange={e => handleChange(e)}>
        {teams.map(t => (
          <option value={t.tricode} key={t.teamId}>
            {t.fullName}
          </option>
        ))}
      </select>
    </label>
  </Flex>
);

TeamPicker.propTypes = {
  teams: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default TeamPicker;
