import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



class AddProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            name_error: '',
            price_error:'',
        };
    }
    myValidate = (name,price) => {      
        let isValid = true;
        this.setState({ name_error: "", price_error: "" });
        if (!(name.length > 1 && name.length <= 50)) {
            this.setState({ name_error: "The length of name must more than 1 and less than 50" });
            alert('The length of name must more than 1 and less than 50');
            isValid = false;
        }
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(price)) {
            this.setState({ price_error: "Please input a number!" });
            alert("Please input a number!");
            isValid = false;
        }
        return isValid;
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let name = this.state.name;
        let price = this.state.price;
        if (this.myValidate(name, price)) {
            fetch('/product/add', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "name": name,"price":price })
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
                    <label>Price</label>
                    <Form.Input type='text'  name='price' onChange={this.myChangeHandler} placeholder='Please input your price.' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                </Form>
        );
    }
}

//ReactDOM.render(<AddProductForm />, document.getElementById('AddProductForm'));
export default AddProductForm



