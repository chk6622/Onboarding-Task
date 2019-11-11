import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import UpdateCustomerForm from './UpdateCustomerForm';
import 'semantic-ui-css/semantic.min.css';

const modalStyle = { position: 'relative', height: '310px' }

class UpdateCustomerModal extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <Modal size='mini' style={modalStyle} onClose={() => this.props.parents.refreshList()} trigger={< Button color='green'>Update</Button>}>
                <Modal.Header>Update Customer</Modal.Header>
                <Modal.Content>

                    <UpdateCustomerForm customerId={this.props.customerId}/>

                </Modal.Content>
            </Modal>
        );
    }
}

export default UpdateCustomerModal

