import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomePage from './components/screens/HomePage';
import DetailPage from './components/screens/DetailPage';
import CartPage from './components/screens/CartPage';
import ProfilePage from './components/screens/ProfilePage';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import FavoritesPage from './components/screens/FavoritesPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store/store';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>



        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen name="Home" component={HomeNavigation}
            options={{
              tabBarIcon: () => (
                <Ionicons name="home-outline" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen name="Cart" component={CartNavigation}
            options={{
              tabBarIcon: () => (
                <Ionicons name="cart-outline" size={24} color="black" />
              ),

            }}
          />
          <Tab.Screen name="Favorites" component={FavoritesPage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="star-outline" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen name="Profile" component={ProfilePage}
            options={{
              tabBarIcon: () => (
                <AntDesign name="user" size={24} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomePage}
        options={{ title: "E-Market" }}
      />
      <Stack.Screen name="Detail" component={DetailPage}
        options={({ route }) => ({ title: route.params.item.item.name })}
      />
    </Stack.Navigator>

  )
}
const CartNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={CartPage}
        options={{ title: "E-Market" }}
      />
    </Stack.Navigator>

  )
}

