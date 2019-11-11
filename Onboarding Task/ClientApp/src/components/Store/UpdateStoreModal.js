import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Container } from 'semantic-ui-react'
import UpdateStoreForm from './UpdateStoreForm';
import 'semantic-ui-css/semantic.min.css';

const modalStyle = { position: 'relative', height: '310px' }

class UpdateStoreModal extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <Modal size='mini' style={modalStyle} onClose={() => this.props.parents.refreshList()} trigger={< Button color='green'>Update</Button>}>
                <Modal.Header>Update Store</Modal.Header>
                <Modal.Content>

                    <UpdateStoreForm storeId={this.props.storeId}/>

                </Modal.Content>
            </Modal>
        );
    }
}

export default UpdateStoreModal

