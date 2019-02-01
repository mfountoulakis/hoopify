import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Box, Flex } from '@rebass/grid';

import t from '../../lib/theme';
import Text from '../Text';
import PlayerPhoto from '../PlayerPhoto';
import SliderPanel from './SliderPanel';
import StatLeader from './StatLeader';

const BaseBackground = styled.div({
  backgroundColor: `${t.colors.orange}`,
  borderRadius: '24px',
  height: '24px',
  position: 'absolute',
  width: '100px',
});

const ActiveBackground = posed(BaseBackground)({
  highlightsActive: {
    x: 100,
  },
  statsActive: {
    x: 0,
  },
  transition: {
    type: 'spring',
  },
});

const SliderButton = styled.button({
  appearance: 'none',
  fontFamily: 'Pilat Extended Bold',
  background: 'transparent',
  border: 'none',
  color: '#fff',
  height: '24px',
  textTransform: 'uppercase',
  width: '100px',
});

const SliderPanels = styled(Flex)({
  overflow: 'scroll',
  width: '100%',
  maxWidth: '100vw',
});

class Slider extends React.Component {
  state = {
    activePanel: 'topstats',
  };

  toggleStatsPanel = () => this.setState({ activePanel: 'topstats' });
  toggleHighlightsPanel = () => this.setState({ activePanel: 'highlights' });

  render() {
    const { activePanel } = this.state;

    return (
      <Flex flexDirection="column">
        <Flex alignItems="center" mb={4}>
          <ActiveBackground
            pose={
              activePanel === 'highlights'
                ? 'highlightsActive'
                : activePanel === 'topstats'
                ? 'statsActive'
                : ''
            }
          />
          <SliderButton onClick={this.toggleStatsPanel}>
            <Text caps fontSize={'8px'}>
              Top Stats
            </Text>
          </SliderButton>
          <SliderButton onClick={this.toggleHighlightsPanel}>
            <Text caps fontSize={'8px'}>
              Highlights
            </Text>
          </SliderButton>
        </Flex>

        <SliderPanels>
          <SliderPanel mr={6}>
            <Text
              caps
              mb={3}
              fontSize={0}
              css={{
                fontFamily: 'Pilat Extended Bold',
                letterSpacing: '0.1em',
              }}
            >
              Points
            </Text>
            <StatLeader playerName="G. Antetekounmpo" statNumber="23" />
            <StatLeader playerName="K. Irving" statNumber="19" />
          </SliderPanel>
          <SliderPanel mr={6}>
            <Text
              caps
              mb={3}
              fontSize={0}
              css={{
                fontFamily: 'Pilat Extended Bold',
                letterSpacing: '0.1em',
              }}
            >
              Rebounds
            </Text>
            <StatLeader playerName="G. Antetekounmpo" statNumber="23" />
            <StatLeader playerName="K. Irving" statNumber="19" />
          </SliderPanel>
          <SliderPanel>
            <Text
              caps
              mb={3}
              fontSize={0}
              css={{
                fontFamily: 'Pilat Extended Bold',
                letterSpacing: '0.1em',
              }}
            >
              Assist
            </Text>
            <StatLeader playerName="G. Antetekounmpo" statNumber="23" />
            <StatLeader playerName="K. Irving" statNumber="19" />
          </SliderPanel>
        </SliderPanels>
      </Flex>
    );
  }
}

export default Slider;
