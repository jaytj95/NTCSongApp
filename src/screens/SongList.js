const {
    View,
    Text,
    FlatList,
} = ReactNative;

import ReactNative from 'react-native';
import React from 'react';
import FirebaseHandler from '../modules/firebaseHandler'
import renderIf from '../components/renderif'

// remove debugging annoyance
console.ignoredYellowBox = ['Setting a timer'];


export default class SongList extends React.Component {

    static navigationOptions = {
        title: 'NTC Song Book',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            songs: []
        };

        this.receivedSongSetFromFirebase = this.receivedSongSetFromFirebase.bind(this);

        this.firebaseHandler = new FirebaseHandler(
        {
            callback: this.receivedSongSetFromFirebase
        });

    }

    componentDidMount() {
        console.log('getting songs in background');
        // TODO: Figure out promise structure here
        this.firebaseHandler.getSongsFromFirebase(false);
    }

    receivedSongSetFromFirebase(data) {
        this.setState({songs: data})
        console.log('set state successfully')
    }

    render() {
        return (
            <View>
                { renderIf(this.state.songs.length > 0,
                    <FlatList
                        data={this.state.songs}
                        renderItem={({song}) => <Text>Hello World</Text>}
                    />
                )}
            </View>
        );
    }
}

module.exports = SongList;