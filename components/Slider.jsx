import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Flex, Box } from '@rebass/grid';

import t from '../lib/theme';
import Text from './Text';
import SliderPanel from './SliderPanel';

const BaseBackground = styled(Box)({
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

const SliderButton = styled('button')({
  appearance: 'none',
  fontFamily: 'Pilat Extended Bold',
  background: 'transparent',
  border: 'none',
  color: '#fff',
  height: '24px',
  textTransform: 'uppercase',
  width: '100px',
});

const SliderPanels = styled(Flex)({ overflow: 'scroll' });

class Slider extends React.Component {
  state = {
    activePanel: 'topstats',
  };

  toggleStatsPanel = () => this.setState({ activePanel: 'stats' });
  toggleHighlightsPanel = () => this.setState({ activePanel: 'highlights' });

  render() {
    const { activePanel } = this.state;

    return (
      <Flex flexDirection="column">
        <Flex alignItems="center">
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
          <SliderPanel>
            <Text>{activePanel}</Text>
          </SliderPanel>
          <SliderPanel>
            <Text>{activePanel}</Text>
          </SliderPanel>
        </SliderPanels>
      </Flex>
    );
  }
}

export default Slider;
