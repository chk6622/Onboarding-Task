import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link, withRouter } from 'react-router-dom';


export class AppMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => {
        /*if (name === 'Customer')
        {
            e.href
        }
        if (name === 'Product') {
            e.href
        }*/
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state
        //debugger;
        return (
            <div>
                <Menu pointing>
                    <Menu.Item as={Link} to="customer"
                        name='Customer'
                        active={activeItem === 'Customer'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="product"
                        name='Product'
                        active={activeItem === 'Product'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="store"
                        name='Store'
                        active={activeItem === 'Store'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="sales"
                        name='Sales'
                        active={activeItem === 'Sales'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Menu.Item as={Link} to="home"
                                name='Onboarding_Task'
                                active={activeItem === 'Home'}
                                onClick={this.handleItemClick}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

