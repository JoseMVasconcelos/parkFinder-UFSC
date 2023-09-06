import * as React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  Linking,
  Switch,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { assertStatusValuesInBounds } from "expo-av/build/AV";

export default class ParkDetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Detalhes do parque",
  };

  constructor(props) {
    super(props);
    let park = props.navigation.getParam("park");
    this.state = {
      id: park.id,
      name: park.name,
      street: park.address.street,
      state_acro: park.address.state_acro,
      images: park.images,
      email: park.email,
      phone_number: park.phone_number,
      entrance_fee: park.entrance_fee,
      entrance_fee_link: park.entrance_fee_link,
      web_link: park.web_link,
      opening_hours: park.opening_hours,
      lat: park.address.geo.lat,
      lon: park.address.geo.lon,
      fav: park.fav,
    };
  }

  parkUpdater = async () => {
    const parks = await AsyncStorage.getItem("parks");
  }

  componentDidMount() {
    setTimeout(async() => {
      await this.parkUpdater();
    }, 200);
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      id,
      name,
      street,
      state_acro,
      images,
      email,
      phone_number,
      entrance_fee,
      entrance_fee_link,
      web_link,
      opening_hours,
      lat,
      lon,
    } = this.state;
    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${lat},${lon}`,
      android: `geo:0,0?q=${lat},${lon}`,
    });

    return (
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.image}>
          <FlatList
            horizontal={true}
            data={images}
            renderItem={({ item }) => (
              <Image style={styles.image} source={{ uri: item }} />
            )}
          />
        </View>

        <View style={styles.titleContainer}>
          <Pressable onPress={() => Linking.openURL(mapUrl)}>
            <Text style={styles.subTitle}>
              {street}, {state_acro}
            </Text>
          </Pressable>
        </View>

        <View style={styles.thinLineContainer}>
          <Text style={styles.thinLine}>Custo do ingresso: {entrance_fee}</Text>
          <Text style={styles.thinLine}>
            Horário de funcionamento: {opening_hours}
          </Text>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.thinLine}>Entre em contato! </Text>
          <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text style={styles.contactText}> - {email}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`tel:${phone_number}`)}>
            <Text style={styles.contactText}> - {phone_number}</Text>
          </Pressable>
        </View>

        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => Linking.openURL(`https:${web_link}`)}
          >
            <Text style={styles.pressableText}> Acesse o site! </Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => Linking.openURL(`https:${entrance_fee_link}`)}
          >
            <Text style={styles.pressableText}> Compre o ingresso! </Text>
          </Pressable>
        </View>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.fav ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={async (value) => {
            const parks = JSON.parse(await AsyncStorage.getItem("parks"));
            parks[id].fav = value;
            this.state.fav = value;
            this.setState({ value });
            await AsyncStorage.setItem("parks", JSON.stringify(parks));
          }}
          value={this.state.fav}
        />
      </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42C3FF",
  },
  titleContainer: {
    alignItems: "center",
  },

  thinLineContainer: {
    justifyContent: "center",
    padding: 4,
  },

  contactContainer: {},

  title: {
    margin: 5,
    fontSize: 36,
    color: "white",
    textAlign: "center",
  },

  subTitle: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
  },

  thinLine: {
    fontSize: 20,
    color: "white",
  },

  contactText: {
    fontSize: 20,
    color: "white",
    paddingVertical: 6,
  },

  pressableContainer: {
    justifyContent: "space-evenly",
  },

  pressable: {
    backgroundColor: "#2196f3",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#black",
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  pressableText: {
    color: "white",
  },

  image: {
    height: windowHeight / 3,
    width: windowWidth,
    borderWidth: 5,
    borderColor: "white",
  },
});
