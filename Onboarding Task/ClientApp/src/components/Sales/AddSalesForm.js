import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



class AddSalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSold: '',

            dateSold_error: '',
            
        };
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
        if (this.myValidate(dateSold)) {
            fetch('/sales/add', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "dateSold": dateSold })
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
                
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

//ReactDOM.render(<AddSalesForm />, document.getElementById('AddSalesForm'));
export default AddSalesForm



