import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './DailyFashion/M8/navigator/MainNavigator';
// not show the remove react native viewer
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default App;
