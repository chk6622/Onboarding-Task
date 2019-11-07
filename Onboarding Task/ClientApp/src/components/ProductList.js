import React, { Component } from 'react';
import { Icon, Label, Menu, Table ,Button} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export class ProductList extends Component {
  static displayName = ProductList.name;

  constructor (props) {
    super(props);
      this.state = { products: [], loading: true };

      fetch('/product/query')
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data, loading: false });
      });
  }

    static renderProductsTable(products) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Button floated='left' icon labelPosition='left' primary size='small'>
                            <Icon name='user' /> 
                            Add Product
                        </Button>
                    </Table.HeaderCell> 
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                    <Table.HeaderCell>Option</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {products.map(product =>
                    <Table.Row>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
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
    let contents = this.state.loading? <p><em>Loading...</em></p>: ProductList.renderProductsTable(this.state.products);

    return (
      <div>
        <h1>Products</h1>
        {contents}
      </div>
    );
  }
}
