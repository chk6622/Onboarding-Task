import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import AddProductForm from './AddProductForm';
import 'semantic-ui-css/semantic.min.css';

class AddProductModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div align='center'>
            <Modal size='tiny' onClose={() => this.props.parents.refreshList()} trigger={< Button floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='archive' />
                Add Product
             </Button>}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Content>

                    <AddProductForm />

                </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default AddProductModal



