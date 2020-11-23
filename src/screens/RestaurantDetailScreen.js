import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const RestaurantDetailScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const id = navigation.getParam('id');

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`);
    setRestaurant(response.data);
  }

  useEffect(() => {
    getRestaurant(id);
  }, []);

  return <View>
    {restaurant 
      ? <FlatList 
          data={restaurant.photos}
          keyExtractor={(photo) => photo}
          renderItem={({item}) => <Image style={styles.image} source={{ uri: item }} />}
        />
      : null
    }
  </View>
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300
  }
});

export default RestaurantDetailScreen;
