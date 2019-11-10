import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AppMenu } from './AppMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <AppMenu/>
        <Container>
          {this.props.children}
            </Container>
      </div>
    );
  }
}
