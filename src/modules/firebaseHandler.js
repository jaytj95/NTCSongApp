import firebase from 'react-native-firebase';
import React from 'react';


class FirebaseHelper extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.getSongsFromFirebase = this.getSongsFromFirebase.bind(this);
        this.onSongsRetrieved = this.onSongsRetrieved.bind(this);
    }

    async getSongsFromFirebase(prod) {
        let path;
        if (prod) {
            // get prod list of songs
            console.log('prod');
            path = 'songlist_v2';
        } else {
            // get debug list of songs
            path = 'songlist_test'
            console.log('debug')
        }
        firebase.database().ref().child(path)
            .on('value', this.onSongsRetrieved, null)
    }

    onSongsRetrieved(snapshot) {
        console.log('songs received');
        let songs = [];
        snapshot.forEach((data) => {
            songs.push(data.toJSON())
        })
        console.log('Song count: ' + songs.length)
        this.props.callback(songs)
    }

}

export default FirebaseHelper;