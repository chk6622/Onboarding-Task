import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import UpdateSalesForm from './UpdateSalesForm';
import 'semantic-ui-css/semantic.min.css';

const modalStyle = { position: 'relative', height: '480px' }

class UpdateSalesModal extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <Modal size='mini' style={modalStyle} onClose={() => this.props.parents.refreshList()} trigger={< Button color='green'>Update</Button>}>
                <Modal.Header>Update Sales</Modal.Header>
                <Modal.Content>

                    <UpdateSalesForm salesId={this.props.salesId}/>

                </Modal.Content>
            </Modal>
        );
    }
}

export default UpdateSalesModal

