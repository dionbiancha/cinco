import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {theme, ThemeProvider} from 'react-native-design-system';
import StepsList from './src/screens/StepsList';
import {StepsListProvider} from './src/context/StepsListContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <StepsListProvider>
      <ThemeProvider theme={theme} components={components}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="StepsList">
            <Stack.Screen name="StepsList" component={StepsList} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StepsListProvider>
  );
}

const components = {};
