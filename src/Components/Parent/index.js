import * as React from 'react';
import { Item, Icon } from 'native-base';

export default class Parent extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <Item style={this.props.item_style} error floatingLabel>
                <Icon style={this.props.icon_style} name={this.props.icon} />
                {children}
            </Item>
        );
    }
}
