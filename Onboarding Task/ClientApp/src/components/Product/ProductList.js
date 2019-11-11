import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteButton from '../DeleteButton.js';
import 'semantic-ui-css/semantic.min.css';




export class ProductList extends Component {
    static displayName = ProductList.name;


    constructor(props) {
        super(props);
        this.state = { products: [], loading: true, refresh: true };
        this.queryData = this.queryData.bind(this);
        //this.deleteData = this.deleteData.bind(this);
        this.renderProductsTable = this.renderProductsTable.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.refreshList();
    }

    queryData(queryUrl) {
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are ' + data.length + ' products.');
                this.setState({ products: data, loading: false, refresh: !this.state.refresh });
            });
    }

    /*deleteData(id) {
        fetch('/product/delete/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setTimeout(alert(myJson), 800);
            })
            .then(
                setTimeout(this.refreshList(), 800)

                //this.queryData("/product/query/")
            );
    }*/

    refreshList() {
        //console.log('refresh start!');
        this.queryData('/product/query/');
        //console.log('refresh stop!');
    }

    renderProductsTable() {


        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <AddProductModal parents={this} />
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
                    {this.state.products.map(product =>
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell><UpdateProductModal productId={product.id} parents={this} /></Table.Cell>
                            <Table.Cell><DeleteButton DeleteUrl={'/product/delete/' + product.id} Callback={this.refreshList} /></Table.Cell>
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

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderProductsTable();

        return (
            <div>
                <h1>Products</h1>



                {contents}
            </div>
        );
    }
}
