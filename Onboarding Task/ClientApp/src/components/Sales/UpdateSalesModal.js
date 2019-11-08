import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import UpdateSalesForm from './UpdateSalesForm';
import 'semantic-ui-css/semantic.min.css';



class UpdateSalesModal extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <Modal size='tiny' onClose={() => this.props.parents.refreshList()} trigger={< Button>Update</Button>}>
                <Modal.Header>Update Sales</Modal.Header>
                <Modal.Content>

                    <UpdateSalesForm salesId={this.props.salesId}/>

                </Modal.Content>
            </Modal>
        );
    }
}

export default UpdateSalesModal

