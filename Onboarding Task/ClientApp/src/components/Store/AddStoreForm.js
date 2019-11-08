import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



class AddStoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            name_error: '',
            address_error:'',
        };
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
        debugger
        event.preventDefault();
        let name = this.state.name;
        let address = this.state.address;
        if (this.myValidate(name, address)) {
            fetch('/store/add', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "name": name,"address":address })
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
                    <label>Name</label>
                    <Form.Input type='text' name='name' onChange={this.myChangeHandler} placeholder='Please input your name.' />
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <Form.Input type='text'  name='address' onChange={this.myChangeHandler} placeholder='Please input your address.' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

//ReactDOM.render(<AddStoreForm />, document.getElementById('AddStoreForm'));
export default AddStoreForm



