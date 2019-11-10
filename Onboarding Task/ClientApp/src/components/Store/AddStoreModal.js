import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import AddStoreForm from './AddStoreForm';
import 'semantic-ui-css/semantic.min.css';

class AddStoreModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Modal size='tiny' onClose={() => this.props.parents.refreshList()} trigger={< Button floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='building outline' />
                Add Store
             </Button>}>
                <Modal.Header>Add Store</Modal.Header>
                <Modal.Content>

                    <AddStoreForm />

                </Modal.Content>
            </Modal>
        );
    }
}

export default AddStoreModal



