const {
    View,
    Text,
} = ReactNative;

import ReactNative from 'react-native';
import React from 'react';



// remove debugging annoyance
console.ignoredYellowBox = ['Setting a timer'];

export default class SongView extends React.Component {

    static navigationOptions = {
        title: 'NTC Song Book',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {

    }


    render() {
        return (
            <View>
                <Text>Song View</Text>
            </View>
        );
    }
}

module.exports = SongView;