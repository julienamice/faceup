import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Button } from "react-native-elements";
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';

function CameraScreen(props) {
    const [permission, setPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [camera, setCamera] = useState(null)

    useEffect(() => {
        console.log(camera)
        _getCameraPerm();
    }, [])

    onPictureSaved = async photo => {
        console.log('Onpicturesavedd')
        let data = new FormData()
        const regex = /Camera\/.*/g;
        let array = regex.exec(photo.uri)
        const photoName = array[0].substring(7)

        data.append('newphoto', {
            uri: photo.uri,
            type: 'images/jpeg',
            name: photoName
        })
        console.log('avant fetch')
        fetch('http://10.2.4.20:3000/upload', { method: 'POST', body: data }).then(res => { var body = res.json(); return body }).then(body => { console.log(body) })
            .catch(err => { console.log(err) })
    }

    _getCameraPerm = async () => {
        console.log('Permission')
        var { status } = await Permissions.askAsync(Permissions.CAMERA);
        var perm = (status === 'granted') ? true : false;
        setPermission(perm);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 10,
            flex: 1
        }
    });

    if (!props.isFocused) {
        return (<View style={{ flex: 1 }}>
        </View>)
    } else {
        return (
            < View style={{ flex: 1 }}>

                <Camera style={{ flex: 1 }} type={type} ref={ref => { setCamera(ref) }} >
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (camera) {
                            console.log('Photo prise')
                            camera.takePictureAsync({ onPictureSaved: onPictureSaved, quality: 1, base64: true, exif: true });
                        }
                    }}>
                    </TouchableOpacity>
                </Camera>

                <Button title={"L'autre camera"} onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                    )
                }} />
            </View >
        )
    }
}

export default withNavigationFocus(CameraScreen);