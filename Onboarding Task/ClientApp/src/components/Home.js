import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';



export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <Container textAlign='center'>
            <h1>Welcome to the onboarding task system!</h1>
        </Container>
    );
  }
}
