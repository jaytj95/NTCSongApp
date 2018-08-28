import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('./styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
    render() {
        let item = this.props.item.item;
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text>
                        <Text style={styles.liTextNum}>{item.SongNumber}:</Text>
                        <Text style={styles.liText} numberOfLines={1}> {item.displayMainText}</Text>
                    </Text>
                    <Text numberOfLines={1} style={styles.liTextSecondary}>{item.displaySubText}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;