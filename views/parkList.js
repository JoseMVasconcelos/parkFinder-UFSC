import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaterParkList from '../assets/water-parks.json';
import {NavigationEvents} from 'react-navigation';

export default class ParkListScreen extends React.Component {
  static navigationOptions = {
    title: 'Parques',
  };

  constructor(props){
    super(props);
    // console.log("parklist.constructor")
    this.state ={
      waterParks: []
    };
  }

  handleParks = async () => {
    // console.log("parklist.handleParks")
    // await AsyncStorage.clear()
    let parks = await AsyncStorage.getItem('parks');

    if (parks) {
      parks = JSON.parse(parks);
    } else {
      parks = WaterParkList;
      await AsyncStorage.setItem('parks', JSON.stringify(parks));
    }
    this.setState({ waterParks: parks})
  }

  componentDidMount() {
    // console.log("parklist.DidMount")
    setTimeout(async() => {
      await this.handleParks();
    }, 200);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <>
        <NavigationEvents onDidFocus={() => {
          this.handleParks();
          console.log('I am triggered')} 
        }/>
        <FlatList style={styles.flatList}
          data={this.state.waterParks}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('ParkDetails', { park: item })}>
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.images[0] }} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.address.city}, {item.address.state_acro}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
          <Button title="Favoritos" onPress={() => navigate('FavouriteList')} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#42C3FF'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderRadius: 5,
    borderColor:'#2196f3', 
    padding: 10
  },
  title: {
    fontSize: 18,
    height: 25,
    color: "white"
  },
  subTitle: {
    fontSize: 12,
    height: 15,
    color: "white"
  },
  image: {
    height: 150,
    width: "90%"
  }
});
