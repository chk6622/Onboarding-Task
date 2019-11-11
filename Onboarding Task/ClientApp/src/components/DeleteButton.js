import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'


const confirmStyle = { position: 'relative', height: '200px' }
/*
 * DeleteUrl:
 * Callback:
 */
class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
        this.deleteData = this.deleteData.bind(this);
        this.show = this.show.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    deleteData() {
        fetch(this.props.DeleteUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setTimeout(alert(myJson), 800);
            })
            .then(
                setTimeout(this.props.Callback(), 800)
            );
    }
    

    show = () => this.setState({ open: true })

    handleConfirm = () => {
        this.deleteData();
        this.setState({ open: false });
    }

    handleCancel = () => {
        //this.props.Callback();
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <Button color='red' onClick={this.show}>Delete</Button>
                <Confirm style={confirmStyle}
                    open={this.state.open}
                    header='This data will be delete!'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default DeleteButton