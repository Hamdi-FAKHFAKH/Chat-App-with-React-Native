import Authentification from './screen/Authentification';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/Home';
import SignUp from './screen/SignUp';
import Chat from './screen/Chat';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="auth"
          component={Authentification}
          options={{ header: () => null }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ header: () => null }}
        ></Stack.Screen>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ header: () => null }}
        ></Stack.Screen>
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ header: () => null }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
