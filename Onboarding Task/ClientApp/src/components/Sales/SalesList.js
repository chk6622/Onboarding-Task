import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button,Input } from "semantic-ui-react";
import AddSalesModal from './AddSalesModal';
import UpdateSalesModal from './UpdateSalesModal';
import DeleteButton from '../DeleteButton.js';
import DropdownSearchQuery from '../DropdownSearchQuery';
import 'semantic-ui-css/semantic.min.css';




export class SalesList extends Component {
    static displayName = SalesList.name;
    

  constructor (props) {
      super(props);
      this.state = { saless: [], loading: true,refresh:true};
      this.queryData = this.queryData.bind(this);
      //this.deleteData = this.deleteData.bind(this);
      this.renderSalesTable = this.renderSalesTable.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);

      this.refreshList();
    }  

    queryData(queryUrl) {   
        let dateSoldQry = this.state['dateSoldQry'];
        let customerId = this.state['customerId'];
        let productId = this.state['productId'];
        let storeId = this.state['storeId'];
        let hasParams = false;
        if (dateSoldQry != null && dateSoldQry != '') {
            queryUrl += '?dateSoldQry=' + dateSoldQry;
            hasParams = true;
        }
        if (customerId != null && customerId != '') {
            if (!hasParams) {
                queryUrl += '?';
            }
            else {
                queryUrl += '&';
            }
            queryUrl += 'customerId=' + customerId;
        }
        if (productId != null && productId != '') {
            if (!hasParams) {
                queryUrl += '?';
            }
            else {
                queryUrl += '&';
            }
            queryUrl += 'productId=' + productId;
        }
        if (storeId != null && storeId != '') {
            if (!hasParams) {
                queryUrl += '?';
            }
            else {
                queryUrl += '&';
            }
            queryUrl += 'storeId=' + storeId;
        }
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are '+data.length+' saless.');
                this.setState({ saless: data, loading: false, refresh: !this.state.refresh});
            });
    }

    refreshList() {
        //console.log('refresh start!');
        this.queryData('/sales/query/');
        //console.log('refresh stop!');
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    renderSalesTable() {
        
        
        return (
            <div>
                <div>
                    <Input type='text' name='dateSoldQry' onChange={this.myChangeHandler} placeholder='Please input date sold.' />&nbsp;
                    <DropdownSearchQuery
                        parent={this}
                        fetchDataUrl='/customer/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='customerId'
                        placeholder='Please select a customer.'
                    />&nbsp;
                    <DropdownSearchQuery
                        parent={this}
                        fetchDataUrl='/product/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='productId'
                        placeholder='Please select a product.'
                    />&nbsp;
                    <DropdownSearchQuery
                        parent={this}
                        fetchDataUrl='/store/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='storeId'
                        placeholder='Please select a store.'
                    />&nbsp;
                    <Button as='a' onClick={() => this.queryData('/sales/query')}>Query</Button>
                </div>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                        <AddSalesModal parents={this}/>
                    </Table.HeaderCell> 
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>DateSold</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Store</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.state.saless.map(sales =>
                    <Table.Row key={sales.id}>
                        <Table.Cell>{sales.dateSold}</Table.Cell>
                        <Table.Cell>{sales.customer == null ? '' : sales.customer.name}</Table.Cell>
                        <Table.Cell>{sales.product == null ? '' : sales.product.name}</Table.Cell>
                        <Table.Cell>{sales.store == null ? '' : sales.store.name}</Table.Cell>
                        <Table.Cell><UpdateSalesModal salesId={sales.id} parents={this} /></Table.Cell>
                        <Table.Cell><DeleteButton DeleteUrl={'/sales/delete/' + sales.id} Callback={this.refreshList}/></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                        
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>

                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
                </Table>
            </div>
    );
  }

    render() {
    let contents = this.state.loading? <p><em>Loading...</em></p>: this.renderSalesTable();

    return (
      <div>
            <h1>Sales</h1>
           
                
         
            {contents}
      </div>
    );
  }
}
