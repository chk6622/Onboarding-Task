import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import DropdownSearchQuery from '../DropdownSearchQuery';
import 'semantic-ui-css/semantic.min.css';



class UpdateSalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            dateSold: '',
            dateSold_error: '',
        };

        this.fillData = this.fillData.bind(this);
        this.fillData();
    }

    fillData() {
        let url = '/sales/edit/' + this.props.salesId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    //debugger
                    this.setState({ 'id': data.id, 'dateSold': data.dateSold, 'customerId': data.customerId, 'productId': data.productId, 'storeId': data.storeId, 'loading': false });
                }
            });
    }
    myValidate = (name) => {
        let isValid = true;
        this.setState({ name_error: "", address_error: "" });
        if (!(name.length > 1 && name.length <= 10)) {
            this.setState({ name_error: "The length of date sold must more than 1 and less than 10" });
            alert('The length of date sold must more than 1 and less than 10');
            isValid = false;
        }

        return isValid;
    }
    
    mySubmitHandler = (event) => {
        event.preventDefault();
        let dateSold = this.state.dateSold;
        let id = this.state.id;
        let customerId = this.state.customerId;
        let productId = this.state.productId;
        let storeId = this.state.storeId;
        alert(productId + '-' + storeId);
        if (this.myValidate(dateSold)) {
            fetch('/sales/update', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "id": id, "dateSold": dateSold, 'customerId': customerId, "productId": productId, "storeId": storeId })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    alert(myJson);
                });
        }
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    render(){
        return (
            <Form onSubmit={this.mySubmitHandler}>
                
                <Form.Field>
                    <label>Date Sold</label>
                    <Form.Input type='text' name='dateSold' value={this.state.dateSold} onChange={this.myChangeHandler} placeholder='Please input sold date.' />
                </Form.Field>
                <Form.Field>
                    <label>Customer</label>
                    <DropdownSearchQuery
                        parent={this}
                        initValue={this.state.customerId}
                        fetchDataUrl='/customer/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='customerId'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Product</label>
                    <DropdownSearchQuery
                        parent={this}
                        initValue={this.state.productId}
                        fetchDataUrl='/product/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='productId'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Store</label>
                    <DropdownSearchQuery
                        parent={this}
                        initValue={this.state.storeId}
                        fetchDataUrl='/store/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='storeId'
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                <Form.Input type='hidden' name='id' value={this.state.id} />
            </Form>
        );
    }
}

export default UpdateSalesForm



