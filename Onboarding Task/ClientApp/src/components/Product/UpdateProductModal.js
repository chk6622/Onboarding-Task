import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import UpdateProductForm from './UpdateProductForm';
import 'semantic-ui-css/semantic.min.css';



class UpdateProductModal extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <Modal size='tiny' onClose={() => this.props.parents.refreshList()} trigger={< Button>Update</Button>}>
                <Modal.Header>Update Product</Modal.Header>
                <Modal.Content>

                    <UpdateProductForm productId={this.props.productId}/>

                </Modal.Content>
            </Modal>
        );
    }
}

export default UpdateProductModal

