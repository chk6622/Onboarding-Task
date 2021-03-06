import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AppMenu } from './AppMenu';
import '../css/AppSheet.css';



export class Layout extends Component {
  static displayName = Layout.name;

  render () {
      return (
          <main>
              <banner>
                  
                  onboarding Task
            </banner>
              <div className='workarea'>
                <nav>
                    <AppMenu />
                </nav>
                <article>
                    <Container>
                        {this.props.children}
                    </Container>
                </article>
              </div>
              <footer>
                  &copy; XING TONG
               </footer>
          </main>
    );
  }
}
