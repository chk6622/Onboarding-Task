import React, { Component } from 'react';
import { Icon, Label, Menu, Table ,Button} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export class CustomerList extends Component {
  static displayName = CustomerList.name;

  constructor (props) {
    super(props);
      this.state = { customers: [], loading: true };

      fetch('/customer/query')
      .then(response => response.json())
      .then(data => {
        this.setState({ customers: data, loading: false });
      });
  }

    static renderCustomersTable(customers) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Button floated='left' icon labelPosition='left' primary size='small'>
                            <Icon name='user' /> 
                            Add Customer
                        </Button>
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
                {customers.map(customer =>
                    <Table.Row>
                        <Table.Cell>{customer.name}</Table.Cell>
                        <Table.Cell>{customer.address}</Table.Cell>
                        <Table.Cell>Edit</Table.Cell>
                        <Table.Cell>Delete</Table.Cell>
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
    );
  }

  render () {
    let contents = this.state.loading? <p><em>Loading...</em></p>: CustomerList.renderCustomersTable(this.state.customers);

    return (
      <div>
        <h1>Customers</h1>
        {contents}
      </div>
    );
  }
}
