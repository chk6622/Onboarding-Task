import React, { Component } from 'react'
import { Segment, Menu, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link, withRouter } from 'react-router-dom';

const menuHeader = {
    height: '35px',
    font: '20px bold',
    border: 'solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const menuItem = {
    height: '30px',
    font: '15px bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export class AppMenu extends Component {
    state = { activeItem:'Home' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state
        //debugger;
        return (
            <Menu vertical>
                <Menu.Item as={Link} to="/"
                    icon='home'
                    name='Home'
                    active={activeItem === 'Home'}
                    onClick={this.handleItemClick}
                />

                <Menu.Item as={Link} to="customer"
                    icon='user' 
                name='Customer'
                active={activeItem === 'Customer'}
                onClick={this.handleItemClick}
                />

                <Menu.Item as={Link} to="product"
                    icon='archive'
                    name='Product'
                    active={activeItem === 'Product'}
                    onClick={this.handleItemClick}
                    />

                <Menu.Item as={Link} to="store"
                    icon ='building outline'
                    name='Store'
                    active={activeItem === 'Store'}
                    onClick={this.handleItemClick}
                    />
                    
                <Menu.Item as={Link} to="sales"
                    icon='dollar sign' 
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                    />

            </Menu >
        )
    }
}

