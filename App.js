import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from './views/splash'
import ParkListScreen from './views/parkList'
import ParkDetailsScreen from './views/parkDetails'
import FavouriteListScreen from './views/favouriteList'

const MainNavigator = createStackNavigator({
  Splash: {screen: SplashScreen},
  ParkList: {screen: ParkListScreen},
  ParkDetails: {screen: ParkDetailsScreen},
  FavouriteList: {screen: FavouriteListScreen}
});
 
const App = createAppContainer(MainNavigator);
export default App;