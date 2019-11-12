import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



class UpdateCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            address: '',
            name_error: '',
            address_error:'',
        };

        this.fillData = this.fillData.bind(this);
        this.fillData();
    }

    fillData() {
        let url = '/customer/edit/' + this.props.customerId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    this.setState({ id: data.id, name: data.name, address: data.address, loading: false });
                }
                
            });
    }
    myValidate = (name,address) => {      
        let isValid = true;
        this.setState({ name_error: "", address_error: "" });
        if (!(name.length > 1 && name.length <= 50)) {
            this.setState({ name_error: "The length of name must more than 1 and less than 50" });
            alert('The length of name must more than 1 and less than 50');
            isValid = false;
        }
        if (!(address.length > 1 && address.length <= 100)) {
            this.setState({ address_error: "The length of address must more than 1 and less than 100" });
            alert('The length of address must more than 1 and less than 100');
            isValid = false;
        }
        return isValid;
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let name = this.state.name;
        let address = this.state.address;
        let id = this.state.id;
        fetch('/customer/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": id, "name": name, "address": address })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                alert(myJson.message);
            });
        /*if (this.myValidate(name, address)) {
            fetch('/customer/update', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "id":id,"name": name,"address":address })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    alert(myJson);
                });
        }*/
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
                    <label>Name</label>
                    <Form.Input type='text' name='name' value={this.state.name} onChange={this.myChangeHandler} placeholder='Please input your name.' />
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <Form.Input type='text' name='address' value={this.state.address} onChange={this.myChangeHandler} placeholder='Please input your address.' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                <Form.Input type='hidden' name='id' value={this.state.id} />
            </Form>
        );
    }
}

export default UpdateCustomerForm



