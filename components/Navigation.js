import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Heart, Activity, Settings } from 'react-feather';

import Text from './Text';
import t from '../lib/theme';

const navCSS = {
  backdropFilter: 'saturate(80%) blur(20px)',
  background: 'rgba(0, 0, 0, 0.8)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  bottom: '0',
  height: '122px',
  position: 'fixed',
  width: '100%',
};

const Tabs = styled(Flex)({
  justifyContent: 'space-between',
  width: '100%',
});

const Tab = styled(Flex)({
  alignItems: 'center',
  flexDirection: 'column',
  fontFamily: 'sans-serif',
  height: '48px',
  justifyContent: 'space-between',
  width: '48px',
  color: '#fff',
});

class Navigation extends React.Component {
  handleClick = e => {
    this.props.filterFavorite();
    e.preventDefault();
  };

  render() {
    const { router } = this.props;
    return (
      <Flex as="nav" px={4} pt={3} css={navCSS}>
        <Tabs>
          <a href="/" style={{ textDecoration: 'none' }}>
            <Tab>
              <Activity
                size={24}
                color={router.pathname === '/' ? `${t.colors.orange}` : '#fff'}
              />
              <Text fontSize={0}>Today</Text>
            </Tab>
          </a>

          <a
            href="/game"
            style={{ textDecoration: 'none' }}
            onClick={e => this.handleClick(e)}
          >
            <Tab>
              <Heart
                size={24}
                color={
                  router.pathname === '/game' ? `${t.colors.orange}` : '#fff'
                }
              />
              <Text fontSize={0}>My Team</Text>
            </Tab>
          </a>

          <a href="/settings" style={{ textDecoration: 'none' }}>
            <Tab>
              <Settings
                size={24}
                color={
                  router.pathname === '/settings'
                    ? `${t.colors.orange}`
                    : '#fff'
                }
              />
              <Text fontSize={0}>Settings</Text>
            </Tab>
          </a>
        </Tabs>
      </Flex>
    );
  }
}

Navigation.propTypes = {
  filterFavorite: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Navigation);
