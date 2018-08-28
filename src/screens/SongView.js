import {ScrollView, StyleSheet} from 'react-native'
import React, {Component} from 'react';

import HTMLView from 'react-native-htmlview';

export default class SongView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.displayMainText}`,
    });

    render() {
        const { params } = this.props.navigation.state;
        console.log('Song View');
        console.log(params);

        let renderString = `<p>${params.item.htmlRenderString}</p>`;

        return (
            <ScrollView>
                <HTMLView
                    style={{padding: 5}}
                    value={renderString}
                    stylesheet={htmlStyles}
                />
            </ScrollView>
        );
    }
}

const htmlStyles = StyleSheet.create({
    p: {
        padding: 5,
        fontSize: 20,
        fontWeight: '300',
        color: '#000000',
    },
    chorus: {
        fontStyle: 'italic'
    },

    bold: {
        fontWeight: 'bold'
    }
});

module.exports = SongView;