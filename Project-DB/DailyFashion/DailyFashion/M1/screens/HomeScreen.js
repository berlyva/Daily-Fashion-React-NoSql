import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {Slider} from 'react-native-elements';
import {imageSlider} from '../data/Data';
import {categoryList} from '../data/Data';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Gambar */}
      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderboxHeight={250}
      />
      {/* kategori */}
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Kategori</Text>
      </View>
      {/*  */}
      <FlatList
        data={categoryList}
        key={3}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('ShowProduct', {categoryId: item.id})
              }>
              <Image source={{uri: item.icon}} style={styles.icon} />
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  flatListContainer: {
    padding: 8,
  },
  button: {
    flex: 1,
    margin: 8,
    borderWidth: 4,
    borderColor: '#7CAF58',
    borderRadius: 10,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    color: 'black',
  },
});
