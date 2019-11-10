import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import AddSalesForm from './AddSalesForm';
import 'semantic-ui-css/semantic.min.css';

class AddSalesModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Modal size='tiny' onClose={() => this.props.parents.refreshList()} trigger={< Button floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='dollar sign' />
                Add Sales
             </Button>}>
                <Modal.Header>Add Sales</Modal.Header>
                <Modal.Content>

                    <AddSalesForm />

                </Modal.Content>
            </Modal>
        );
    }
}

export default AddSalesModal



