import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import ShowProductScreen from '../screens/ShowProductScreen';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ImageZoomScreen from '../screens/ImageZoomScreen';
import EditProductScreen from '../screens/EditProductScreen';
import SplashScreen from '../screens/SplashScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Daily Fashion M8',
          headerStyle: {
            backgroundColor: '#D1E5C2',
          },
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="home" type="antdesign" />,
        }}
      />
      <Drawer.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          title: 'Add Product',
          headerStyle: {
            backgroundColor: '#D1E5C2',
          },
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="plus" type="antdesign" />,
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowProduct"
          component={ShowProductScreen}
          options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#D1E5C2',
            },
          }}
        />
        <Stack.Screen
          name="ImageZoom"
          component={ImageZoomScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={{
            title: 'Edit Product',
            headerTitleAlign: 'center',

            headerStyle: {
              backgroundColor: '#D1E5C2',
            },
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
