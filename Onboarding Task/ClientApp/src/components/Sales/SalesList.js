import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import AddSalesModal from './AddSalesModal';
import UpdateSalesModal from './UpdateSalesModal';
import 'semantic-ui-css/semantic.min.css';




export class SalesList extends Component {
    static displayName = SalesList.name;
    

  constructor (props) {
      super(props);
      this.state = { saless: [], loading: true,refresh:true};
      this.queryData = this.queryData.bind(this);
      this.deleteData = this.deleteData.bind(this);
      this.renderSalesTable = this.renderSalesTable.bind(this);
      this.refreshList = this.refreshList.bind(this);

      this.refreshList();
    }  

    queryData(queryUrl) {   
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are '+data.length+' saless.');
                this.setState({ saless: data, loading: false, refresh: !this.state.refresh});
            });
    }

    deleteData(id) {
        fetch('/sales/delete/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setTimeout(alert(myJson), 800);
            })
            .then(
                setTimeout(this.refreshList(), 800)
                
        //this.queryData("/sales/query/")
            );
    }

    refreshList() {
        //console.log('refresh start!');
        this.queryData('/sales/query/');
        //console.log('refresh stop!');
    }

    renderSalesTable() {
        
        
    return (
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
                        <Table.Cell><UpdateSalesModal salesId={sales.id} parents={this}/></Table.Cell>
                        <Table.Cell><Button value={sales.id} onClick={()=>this.deleteData(sales.id)}>Delete</Button></Table.Cell>
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
