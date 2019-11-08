import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CustomerList } from './components/Customer/CustomerList';
import { ProductList } from './components/Product/ProductList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/product' component={ProductList} />
        <Route path='/customer' component={CustomerList} />
      </Layout>
    );
  }
}
