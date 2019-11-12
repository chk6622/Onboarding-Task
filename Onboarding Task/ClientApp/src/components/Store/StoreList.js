import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Confirm,Input } from "semantic-ui-react";
import AddStoreModal from './AddStoreModal';
import UpdateStoreModal from './UpdateStoreModal';
import DeleteButton from '../DeleteButton.js';
import 'semantic-ui-css/semantic.min.css';




export class StoreList extends Component {
    static displayName = StoreList.name;
    

  constructor (props) {
      super(props);
      this.state = { stores: [], loading: true,refresh:true};
      this.queryData = this.queryData.bind(this);
      //this.deleteData = this.deleteData.bind(this);
      this.renderStoresTable = this.renderStoresTable.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);

      this.refreshList();
    }  

    queryData(queryUrl) {   
        let nameQry = this.state['nameQry'];
        let addressQry = this.state['addressQry'];
        let hasParams = false;
        if (nameQry != null && nameQry != '') {
            queryUrl += '?nameQry=' + nameQry;
            hasParams = true;
        }
        if (addressQry != null && addressQry != '') {
            if (!hasParams) {
                queryUrl += '?';
            }
            else {
                queryUrl += '&';
            }
            queryUrl += 'addressQry=' + addressQry;
        }
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are '+data.length+' stores.');
                this.setState({ stores: data, loading: false, refresh: !this.state.refresh});
            });
    }

    refreshList() {
        //console.log('refresh start!');
        this.queryData('/store/query/');
        //console.log('refresh stop!');
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    renderStoresTable() {
        
        
        return (
            <div>
                <div>
                    <Input type='text' name='nameQry' onChange={this.myChangeHandler} placeholder='Please input name.' />&nbsp;
                    <Input type='text' name='addressQry' onChange={this.myChangeHandler} placeholder='Please input address.' />&nbsp;
                    <Button as='a' onClick={() => this.queryData('/store/query')}>Query</Button>
                </div>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <AddStoreModal parents={this}/>
                    </Table.HeaderCell> 
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.state.stores.map(store =>
                    <Table.Row key={store.id}>
                        <Table.Cell>{store.name}</Table.Cell>
                        <Table.Cell>{store.address}</Table.Cell>
                        <Table.Cell><UpdateStoreModal storeId={store.id} parents={this} /></Table.Cell>
                        <Table.Cell><DeleteButton DeleteUrl={'/store/delete/' + store.id} Callback={this.refreshList}/></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        
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
    let contents = this.state.loading? <p><em>Loading...</em></p>: this.renderStoresTable();

    return (
      <div>
            <h1>Stores</h1>
           
                
         
            {contents}
      </div>
    );
  }
}
