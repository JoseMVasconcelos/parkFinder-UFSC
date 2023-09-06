import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FavouriteListScreen extends React.Component {
  static navigationOptions = {
    title: 'Parques Favoritos',
  };

  constructor(props) {
    super(props);

    this.state = {
      parks: []
    };
  }

  handleParks = async () => {
    const parks = JSON.parse(await AsyncStorage.getItem("parks"));
    const filtered = parks.filter(park => {
      return park.fav;
    })

    this.setState({ parks: filtered })
  }

  componentDidMount() {
    setTimeout(async() => {
      await this.handleParks();
    }, 200);
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <FlatList style={styles.flatList}
          data={this.state.parks}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('ParkDetails', { park: item })}
              >
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.images[0] }} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.address.city}, {item.address.state_acro}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View>
          <Button style={styles.button} title="Voltar" onPress={() => navigate('ParkList')} />
        </View>
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
  },
  button: {
    color: "black",
    height: 50,
    width: 50,
  }
});
