// import React from 'react';
import React, { Component } from 'react';
import Button from '../components/Button';

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
    const { promptEvent } = this.state;
    return <Button onClick={() => promptEvent.prompt()}>Install Me</Button>;
  }
}

export default Index;
