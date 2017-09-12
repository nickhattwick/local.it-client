import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

export default class Saved extends Component {

  viewInterestsByCity = () => {
    this.props.navigation.navigate('InterestsByCity');
  }

  constructor (props) {
    super(props);

    this.state = {
      interestsByCity: [
        {
          interests: [],
          dislikedInterests: [],
          city: 'Los Angeles, CA',
        },
        {
          interests: [],
          dislikedInterests: [],
          city: 'San Francisco, CA',
        },
        {
          interests: [],
          dislikedInterests: [],
          city: 'San Diego, CA',
        },
      ]
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.interestsByCity}
          keyExtractor={(city, index) => index }
          renderItem={({ item }) =>
          <TouchableOpacity
            style={styles.cityItem}
            onPress={() => this.viewInterestsByCity()}>
              <Text
                style={styles.cityText}>
                {item.city}
              </Text>
          </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cityItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff'
  },
  cityText: {
    color: '#596a7f',
  }
})
