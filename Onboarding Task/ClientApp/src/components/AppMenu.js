import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


export class AppMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => {
        if (name === 'Customer')
        {
            e.href
        }
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing>
                    <Menu.Item as='a' href="customer"
                        name='Customer'
                        active={activeItem === 'Customer'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='friends'
                        active={activeItem === 'friends'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            Onboarding_Task
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

