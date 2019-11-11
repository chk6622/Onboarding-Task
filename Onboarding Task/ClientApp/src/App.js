import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CustomerList } from './components/Customer/CustomerList';
import { ProductList } from './components/Product/ProductList';
import { StoreList } from './components/Store/StoreList';
import { SalesList } from './components/Sales/SalesList';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/store' component={StoreList} />
            <Route path='/product' component={ProductList} />
            <Route path='/customer' component={CustomerList} />
            <Route path='/sales' component={SalesList} />
            
      </Layout>
    );
  }
}
