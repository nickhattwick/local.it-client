import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  DeviceEventEmitter
} from 'react-native';
import axios from 'axios';

export default class Itinerary extends Component {

  constructor (props) {
    super(props);
    this.state = {
      itineraryData: null
    }
  }

  getInitialData () {
    let user = this.props.screenProps.fbID;
    axios.get('http://localhost:3000/api/' + user, { method: 'GET' })
      .then((data) => {
        this.setState({
          itineraryData: data.data.itineraryByCity
        })
      })
  }

  componentWillMount() {
    this.getInitialData();
    DeviceEventEmitter.addListener('newItinerary', (event) => {
      this.setState({
        itineraryData: event.data.itineraryByCity
      });
    });
  }

  viewItinerary = (name) => {
    this.props.navigation.navigate('MapView', {list: name});
  };

  getPhotoByCIty () {
    let cities = this.props.screenProps.interestsByCity;
    return cities.map(city => {
      return city.interests[0].image_url;
    });
  }

  render() {
    let location;
    if (this.props.screenProps.itineraryByCity[0] === undefined) {
      location = null;
    } else {
      location = this.props.screenProps.interestsByCity[0].city;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.itineraryData}
          keyExtractor={(itinerary, index) => index }
          renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.itineraryItem}
              onPress={() => this.viewItinerary(item.itineraryList)}>
               <ImageBackground
                style={styles.image}
                source={{ uri: photos[0] }}
              >
                <View style={{width: 400, marginLeft: 10}}>
                  <Text style={styles.itineraryTextName}>{item.name}</Text>
                  <Text style={styles.itineraryText}>Location: {item.location}</Text>
                  <Text style={styles.itineraryText}>{item.itineraryList.length} Saved</Text>
                </View>
                </ImageBackground>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itineraryItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff'
  },
  itineraryTextName: {
    color: '#596A7F',
    fontFamily: 'Avenir Light',
    fontWeight: 'bold',
    fontSize: 16
  },
  itineraryText: {
    color: '#596A7F',
    fontFamily: 'Avenir Light',
    fontWeight: 'normal',
    fontSize: 16
  },
  picker: {
    width: 1000,
    height: 1000,
  }
})
