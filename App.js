import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Order from './pages/Order';
import Home from './pages/Home';
import BuyLogo from './img/BuyLogo';
import OrderLogo from './img/OrderLogo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: 'blue',
          tabBarInactiveBackgroundColor: 'gray',
          activeBackgroundColor: '#D0D4CA',
        }}>
        <Tab.Screen
          name="Satın Al"
          component={Home}
          options={{
            tabBarIcon: () => <BuyLogo />,
          }}
        />
        <Tab.Screen
          name="Siparişlerim"
          component={Order}
          options={{
            tabBarIcon: () => <OrderLogo />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
