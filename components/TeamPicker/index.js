import React from 'react';
import Button from '../Button';

import { Flex } from '@rebass/grid';
import PropTypes from 'prop-types';
import Text from '../Text';

const TeamPicker = ({ teams, handleChange, handleClick }) => (
  <Flex justifyContent={'center'}>
    <label>
      <Text>Choose your favorite NBA team to start.</Text>
      <select onChange={e => handleChange(e)}>
        {teams.map(t => (
          <option value={t.tricode} key={t.teamId}>
            {t.fullName}
          </option>
        ))}
      </select>
    </label>

    <Button onClick={() => handleClick()}>GO</Button>
  </Flex>
);

TeamPicker.propTypes = {
  teams: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default TeamPicker;
