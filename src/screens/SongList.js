const {
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
} = ReactNative;

import ReactNative from 'react-native';
import React from 'react';
import FirebaseHandler from '../modules/firebaseHandler'
import ListItem from '../components/ListItem'
import renderIf from '../components/renderif'
const styles = require('../components/styles.js')

// remove debugging annoyance
console.ignoredYellowBox = ['Setting a timer'];


export default class SongList extends React.Component {

    static navigationOptions = {
        title: 'NTC Song Book',
    };

    constructor(props) {
        super(props);
        this.state = {
            useProd: true,
            songsReceived: true,
            songs: [],
            searchText: '',
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
        this.firebaseHandler.getSongsFromFirebase(this.state.useProd);
    }

    receivedSongSetFromFirebase(data) {
        this.setState(
            {
                songsReceived: false,
                songs: data,
                originalSet: data
            })
        console.log('set state successfully')
    }

    render() {
        let setSearchText = (text) => {
            this.setState({searchText: text})
            // TODO: only start searching when done typing
            console.log("searching for songs with [" + text + "]")
            let originalDataSet = this.state.originalSet;
            let items = [];
            if(text.length === 0) {
                console.log("empty string");
                this.setState({
                    songs: originalDataSet,
                });
            } else {
                // begin function
                console.log("begin search");
                for (let i = 0; i < originalDataSet.length; i++) {
                    let obj = originalDataSet[i];
                    if (obj.searchableTitle.indexOf(text.toLowerCase()) !== -1) {
                        items.push(obj)
                    }
                }
                this.setState({
                    songs: items
                });

            }
        }

        return (
            <View style={styles.container}>
                { renderIf(this.state.songsReceived > 0,
                    <ActivityIndicator
                        style={{ height: 80 }}
                        color="#1C1339"
                        size="large"
                    />
                )}
                { renderIf(!this.state.songsReceived > 0,
                    <View>

                        <TextInput
                            style={styles.li}
                            value={this.state.searchText}
                            onChangeText={setSearchText}
                            placeholder='Search' />

                        <FlatList
                            data={this.state.songs}
                            renderItem={(song) =>
                                <ListItem item={song}
                                          onPress={() => this.props.navigation.navigate('SongView', song)}/>}
                            kxeyExtractor={(song, index) => index}
                        />
                    </View>
                )}
            </View>
        );
    }
}

module.exports = SongList;