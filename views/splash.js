import * as React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';


export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  render() {
    const {navigate} = this.props.navigation;
    const image = require('../assets/water-park-icon.png');
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.logo}/>
        <Pressable style={styles.pressable} onPress={() => {
            navigate('ParkList')
          }
        }>
          <Text style = {styles.text}>Entrar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42C3FF',
  },

  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    margin: "50%"
  },

  text: {
    fontSize: 20,
    minHeight: 20,
    color: "white"
  },

  pressable: {
    backgroundColor: "#2196f3",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#black',
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
