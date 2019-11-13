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
      this.state = {
          saless: [],
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
      this.renderSalesTable = this.renderSalesTable.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);
      this.skipPage = this.skipPage.bind(this);
      this.skipPage = this.skipPage.bind(this);
      this.getQueryParamsUrl = this.getQueryParamsUrl.bind(this);
      this.paginate = this.paginate.bind(this);

      this.refreshList();
    }  

    queryData(queryUrl, curPage) {   
        //alert(queryUrl);
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                //console.log('There are '+data.length+' saless.');
                this.setState({ curPageIndex: curPage, totalData: data.totalData,saless: data.results, loading: false, refresh: !this.state.refresh});
            });
    }

    getQueryParamsUrl(queryUrl) {
        let dateSoldQry = this.state['dateSoldQry'];
        let customerId = this.state['customerId'];
        let productId = this.state['productId'];
        let storeId = this.state['storeId'];
        if (dateSoldQry != null && dateSoldQry != '') {
            queryUrl += '&dateSoldQry=' + dateSoldQry;
        }
        if (customerId != null && customerId != '') {
           
            queryUrl += '&customerId=' + customerId;
        }
        if (productId != null && productId != '') {
          
            queryUrl += '&productId=' + productId;
        }
        if (storeId != null && storeId != '') {
            
            queryUrl += '&storeId=' + storeId;
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
        if (curPage == null || curPage == undefined) {
            curPage = 1;
        }
        let url = '/sales/query/';
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

    renderSalesTable() {
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
    let contents = this.state.loading? <p><em>Loading...</em></p>: this.renderSalesTable();

    return (
      <div>
            <h1>Sales</h1>
           
                
         
            {contents}
      </div>
    );
  }
}
