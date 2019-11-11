import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react';
import AddCustomerForm from './AddCustomerForm';
import 'semantic-ui-css/semantic.min.css';
import '../../css/AppSheet.css';

const modalStyle = { position: 'relative',  height: '310px' }

class AddCustomerModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <Modal size='mini' style={modalStyle} onClose={() => this.props.parents.refreshList()} trigger={< Button floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='user' />
                Add Customer
             </Button>}>
                <Modal.Header>Add Customer</Modal.Header>
                <Modal.Content>

                        <AddCustomerForm />

                </Modal.Content>
                </Modal>
                
        );
    }
}

export default AddCustomerModal



