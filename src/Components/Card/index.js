import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { View } from 'native-base';

const windowWidth = Dimensions.get('window').width;

class Index extends Component {
    render() {
        return (
            <View style={styles.card} shadowColor={'#000'} shadowOffset={{width: 0, height: 10}} shadowOpacity={0.4} shadowRadius={20}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fcfcfc',
        height: 280,
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
});

export default Index;
