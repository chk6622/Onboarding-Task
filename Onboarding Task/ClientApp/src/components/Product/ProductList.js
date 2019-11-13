import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button,Input } from "semantic-ui-react";
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteButton from '../DeleteButton.js';
import 'semantic-ui-css/semantic.min.css';




export class ProductList extends Component {
    static displayName = ProductList.name;


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            refresh: true,
            totalData: 0,
            dataPerPage: 5,
            curPageIndex: 1,
            skipData: 0,
            maxPageNumber: 1,
            beginPage: 1,
            endPage: 1,
        };
        this.queryData = this.queryData.bind(this);
        //this.deleteData = this.deleteData.bind(this);
        this.renderProductsTable = this.renderProductsTable.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.skipPage = this.skipPage.bind(this);
        this.skipPage = this.skipPage.bind(this);
        this.getQueryParamsUrl = this.getQueryParamsUrl.bind(this);
        this.paginate = this.paginate.bind(this);

        this.refreshList();
    }

    queryData(queryUrl, curPage) {
       
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are ' + data.length + ' products.');
                this.setState({ curPageIndex: curPage, totalData: data.totalData,products: data.results, loading: false, refresh: !this.state.refresh });
            });
    }

    getQueryParamsUrl(queryUrl) {
        let nameQry = this.state['nameQry'];
        let addressQry = this.state['addressQry'];
        if (nameQry != null && nameQry != '') {
            queryUrl += '&nameQry=' + nameQry;
        }
        if (addressQry != null && addressQry != '') {
            queryUrl += '&addressQry=' + addressQry;
        }
        return queryUrl;
    }

    getPaginatedUrl(url, paginationParams) {
        url += '?skipData=' + paginationParams.skipData + '&dataPerPage=' + paginationParams.dataPerPage;
        return url;
    }

    paginate(curPage) {
        //debugger
        let totalData = (this.state['totalData'] == null || this.state['totalData'] == undefined) ? 0 : this.state['totalData'];
        let dataPerPage = (this.state['dataPerPage'] == null || this.state['dataPerPage'] == undefined) ? 10 : this.state['dataPerPage'];
        let curPageIndex = (curPage == null || curPage == undefined) ? 1 : curPage;
        let skipData = (curPageIndex - 1) * dataPerPage;
        //let maxPageNumber = totalData % dataPerPage > 0 ? integer(totalData / dataPerPage) + 1 : int(totalData / dataPerPage);
        let maxPageNumber = Math.ceil(totalData / dataPerPage) <= 0 ? 1 : Math.ceil(totalData / dataPerPage);
        let beginPage = curPageIndex - 2 <= 0 ? 1 : curPageIndex - 2;
        let endPage = curPageIndex + 2 > maxPageNumber ? maxPageNumber : curPageIndex + 2;
        return { totalData: totalData, dataPerPage: dataPerPage, curPageIndex: curPageIndex, skipData: skipData, maxPageNumber: maxPageNumber, beginPage: beginPage, endPage: endPage };
    }

    refreshList(curPage) {
        //debugger
        if (curPage == null || curPage == undefined) {
            curPage = (this.state['curPageIndex'] == null || this.state['curPageIndex'] == undefined) ? 1 : this.state['curPageIndex'];
        }
        let url = '/product/query/';
        let paginationParams = this.paginate(curPage);
        url = this.getPaginatedUrl(url, paginationParams);
        url = this.getQueryParamsUrl(url);
        this.queryData(url, curPage);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    skipPage = (event, { name }) => {
        //debugger
        this.refreshList(name);
    }

    renderProductsTable() {
        let paginationParams = this.paginate(this.state.curPageIndex);
        let beginPage = paginationParams.beginPage;
        let endPage = paginationParams.endPage;
        let curPage = paginationParams.curPageIndex;
        let pages = new Array();
        //debugger
        for (let ind = beginPage; ind <= endPage; ind++) {
            pages.push(ind);
        }
        return (
            <div>
                <div>
                    <Input type='text' name='nameQry' onChange={this.myChangeHandler} placeholder='Please input name.' />&nbsp;
                    <Input type='text' name='priceQry' onChange={this.myChangeHandler} placeholder='Please input price.' />&nbsp;
                    <Button as='a' onClick={() => this.queryData('/product/query')}>Query</Button>
                </div>
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
                                    {pages.map(pageIndex =>
                                        <Menu.Item as='a' className={pageIndex == curPage ? 'big' : 'normal'} name={pageIndex} onClick={this.skipPage}>
                                            {pageIndex}
                                        </Menu.Item>
                                    )}
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
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
