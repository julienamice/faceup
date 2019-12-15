import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from "react-native-elements";



export default function HomeScreen(props) {
    return (
        <ImageBackground source={require('./assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.text}>Face up !</Text>
                <Button styleContainer={styles.button} title={'Non à la vie'} onPress={() => { props.navigation.navigate('Camera') }}></Button>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: '#fff'
    },
    button: {
        borderColor: '#fff',
        alignItems: 'center',

    }
});
