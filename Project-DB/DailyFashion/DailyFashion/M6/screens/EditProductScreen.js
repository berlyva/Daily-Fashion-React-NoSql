import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {InputComponent} from './InputComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../data/Data';
import realm from '../store/realm';
const EditProductScreen = props => {
  const {navigation} = props;
  const {route} = props;
  const idProduct = route.params.idProduct;

  const [productData, setProductData] = useState({
    productName: '',
    imagePath: '',
    category: null,
    description: '',
    price: null,
    instagram: '',
    facebook: '',
    phoneNumber: '',
  });

  const onInputChange = (type, value) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setProductData({
          ...productData,
          imagePath: image.path,
        });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };

  const saveData = () => {
    const updatedData = realm
      .objects('Product')
      .filtered(`id = ${idProduct}`)[0];
    //

    if (
      productData.productName === '' ||
      productData.imagePath === '' ||
      productData.description === '' ||
      productData.price === '' ||
      productData.category === null
    ) {
      alert('Please fill all your product information!');
    } else if (
      productData.phoneNumber === '' &&
      productData.instagram === '' &&
      productData.facebook === ''
    ) {
      alert('Please fill at least one seller contact!');
    } else if (
      updatedData.productName === productData.productName &&
      updatedData.imagePath === productData.imagePath &&
      updatedData.category === productData.category &&
      updatedData.description === productData.description &&
      updatedData.price === parseInt(productData.price) &&
      updatedData.instagram === productData.instagram &&
      updatedData.facebook === productData.facebook &&
      updatedData.phoneNumber === productData.phoneNumber
    ) {
      alert('Nothing to update!');
    } else {
      realm.write(() => {
        updatedData.productName = productData.productName;
        updatedData.imagePath = productData.imagePath;
        updatedData.category = productData.category;
        updatedData.description = productData.description;
        updatedData.price = parseInt(productData.price);
        updatedData.instagram = productData.instagram;
        updatedData.facebook = productData.facebook;
        updatedData.phoneNumber = productData.phoneNumber;
      });
      Alert.alert('Success', 'Successfully update your product information!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };
  useEffect(() => {
    const data = realm.objects('Product').filtered(`id = ${idProduct}`)[0];
    setProductData({
      productName: data.productName,
      imagePath: data.imagePath,
      category: data.category,
      description: data.description,
      price: String(data.price),
      instagram: data.instagram,
      facebook: data.facebook,
      phoneNumber: data.phoneNumber,
    });
  }, [idProduct]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => addImage()}>
            <Image
              style={{
                width: productData.imagePath !== '' ? wp('50%') : 50,
                height: productData.imagePath !== '' ? wp('50%') : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ''
                    ? productData.imagePath
                    : 'https://upload.wikimedia.org/wikipedia/commons/f/fa/ETC_2016-actual.png',
              }}
            />
          </TouchableOpacity>
          <View style={styles.horizontalContainer}>
            <InputComponent
              placeholder="Product Name"
              value={productData.productName}
              onChangeText={text => onInputChange('productName', text)}
            />
            <SelectDropdown
              data={categoryList}
              defaultValueByIndex={productData.category - 1}
              defaultButtonText="Select category"
              onSelect={item => {
                onInputChange('category', item.id);
              }}
              buttonTextAfterSelection={item => {
                return item.name;
              }}
              rowTextForSelection={item => {
                return item.name;
              }}
              buttonStyle={styles.selectDropdown}
              buttonTextStyle={styles.selectText}
              //   ref={dropdownRef}
            />
          </View>
          <View style={styles.horizontalContainer}>
            <InputComponent
              placeholder="Description"
              value={productData.description}
              onChangeText={text => onInputChange('description', text)}
              isDescription={true}
            />
            <InputComponent
              placeholder="Price"
              keyboardType="numeric"
              value={productData.price}
              onChangeText={text => onInputChange('price', text)}
              isIcon={true}
              name="dollar"
              type="font-awesome"
            />
          </View>
        </View>
        {/* seller */}
        <Text style={styles.sellerText}>Seller Contact</Text>
        <InputComponent
          placeholder="Whastapp number (ex : +4498739230)"
          value={productData.phoneNumber}
          onChangeText={text => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
          keyboardType="phone-pad"
        />
        <InputComponent
          placeholder="Instagram username (ex : timedooracademy)"
          value={productData.instagram}
          onChangeText={text => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram"
          type="font-awesome"
        />
        <InputComponent
          placeholder="Facebook username (ex : timedooracademy)"
          value={productData.facebook}
          onChangeText={text => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook-square"
          type="font-awesome"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imageButton: {
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sellerText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 0,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'mistyrose',
  },
  saveText: {
    color: 'black',
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: '40%',
    height: hp('4%'),
    marginLeft: 8,
  },
  selectText: {
    fontSize: hp('1,5%'),
    fontWeight: 'bold',
    padding: 2,
  },
});
