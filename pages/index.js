import React, { Component } from 'react';

import Score from '../components/Score';

const score = {
  homeTeam: 888,
  awayTeam: 888,
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
    };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }
  }

  render() {
    return <Score score={score} />;
  }
}

export default Index;
