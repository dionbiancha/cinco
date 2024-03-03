import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {StyleSheet} from 'react-native';

// wrap whole app with <GestureHandlerRootView>
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Header, theme, ThemeProvider} from 'react-native-design-system';
import StepsList from './src/screens/StepsList';

export default function App() {
  return (
    <ThemeProvider theme={theme} components={components}>
      <Header>Header number</Header>
      <GestureHandlerRootView style={styles.container}>
        <StepsList />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const components = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1F26',
    padding: 10,
  },
});
