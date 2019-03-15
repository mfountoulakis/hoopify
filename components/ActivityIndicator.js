import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const IndicatorBackground = styled(Flex)({
  height: 2,
  width: 40,
});

const IndicatorInner = styled(Flex)({
  backgroundColor: '#00FA9A',
  height: '100%',
  width: 20,
  borderRadius: 2,
});

const AnimatedIndicator = posed(IndicatorInner)({
  left: {
    x: '0%',
    transition: {
      type: 'spring',
      ease: 'easeOut',
    },
  },
  right: {
    x: '100%',
    transition: {
      type: 'spring',
      ease: 'easeOut',
    },
  },
});

class ActivityIndicator extends React.Component {
  constructor() {
    super();
    this.props = {
      gameOn: false,
    };
    this.state = {
      isActive: true,
      sliderOn: false,
    };
  }

  static propTypes = {
    gameOn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (this.props.gameOn) {
      this.interval = setInterval(this.slide, 300);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  slide = () =>
    this.setState({
      sliderOn: !this.state.sliderOn,
    });

  render() {
    const { sliderOn } = this.state;
    return (
      <IndicatorBackground>
        <AnimatedIndicator pose={sliderOn ? 'left' : 'right'} />
      </IndicatorBackground>
    );
  }
}

export default ActivityIndicator;
