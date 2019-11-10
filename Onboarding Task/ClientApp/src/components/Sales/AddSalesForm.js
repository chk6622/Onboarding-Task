import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import DropdownSearchQuery from '../DropdownSearchQuery';
import 'semantic-ui-css/semantic.min.css';



class AddSalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSold: '',

            dateSold_error: '',
            
        };
    }
    myValidate = (dateSold) => {      
        let isValid = true;
        this.setState({ name_error: "", address_error: "" });
        if (!(dateSold.length > 1 && dateSold.length <= 10)) {
            this.setState({ dateSold_error: "The length of date sold must more than 1 and less than 10" });
            alert('The length of date sold must more than 1 and less than 10');
            isValid = false;
        }
        
        return isValid;
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let dateSold = this.state.dateSold;
        let customerId = this.state.customerId;
        let productId = this.state.productId;
        let storeId = this.state.storeId;
        
        if (this.myValidate(dateSold)) {
            fetch('/sales/add', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "dateSold": dateSold, "customerId": customerId,"productId":productId,"storeId":storeId})
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
    render() {
        return (
            <Form onSubmit={this.mySubmitHandler}>
                <Form.Field>
                    <label>Date Sold</label>
                    <Form.Input type='text' name='dateSold' onChange={this.myChangeHandler} placeholder='Please input sold date.' />
                </Form.Field>
                <Form.Field>
                    <label>Customer</label>
                    <DropdownSearchQuery
                        parent={this}
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
                        fetchDataUrl='/store/query'
                        optionTextPropsName='name'
                        optionValuePropsName='id'
                        returnPropsName='storeId'
                    />
                </Form.Field>
                
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

//ReactDOM.render(<AddSalesForm />, document.getElementById('AddSalesForm'));
export default AddSalesForm



