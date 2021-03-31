import React from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system'

export default class CacheImage extends React.Component {
    
    state = {
        source: null,
        loading: true, 
        failed: false,
    };

    componentDidMount = async () => {
        const { uri } = this.props;
        if (!uri) {
            this.setState({
                failed: true,
                loading: false
            })
        }
        else {
            const name = shorthash.unique(uri);
            const path = `${FileSystem.cacheDirectory}${name}`;
            const image = await FileSystem.getInfoAsync(path);
            if (image.exists) {
                console.log('read image from cache');
                this.setState({
                    loading: false,
                    source: {
                        uri: image.uri,
                    },
                });
                return;
            }

            console.log('downloading image to cache');
            //const newImage = 
            await FileSystem.downloadAsync(uri, path)
            .then(this.setState({
                source: {
                    uri: uri,
                },
                loading: false,
            }))
            .catch(e => {
                console.log('Image loading error:', e);
                // if the online download fails, load the local version
                this.setState({
                    failed: true,
                    loading: false
                })
            });
        }
    }
    
    render() {
        if (this.state.loading) {
            // while the image is being checked and downloading
            return(
              <View style={{paddingTop: 50}}>
                <ActivityIndicator size="small" color="gray" />
              </View>
            );
        }
        if (this.state.failed) {
              // if the image url has an issue
            return (
                <Image style={this.props.style} source={require('../assets/default_img.jpg')} /> 
            );
        }
        return <Image style={this.props.style} source={this.state.source} />;
    }
}
